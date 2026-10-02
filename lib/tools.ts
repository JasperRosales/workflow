import { GoogleGenAI } from "@google/genai"

export const TOOL_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.6-flash"

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured")
  }
  return new GoogleGenAI({ apiKey })
}

function parseJson(content: string): unknown {
  let text = content.trim()
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) text = fence[1].trim()
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model response did not contain a JSON object")
  }
  return JSON.parse(text.slice(start, end + 1))
}

async function runTool(
  systemInstruction: string,
  userPrompt: string
): Promise<unknown> {
  const client = getClient()
  const response = await client.models.generateContent({
    model: TOOL_MODEL,
    contents: userPrompt,
    config: {
      systemInstruction,
      temperature: 0.4,
      maxOutputTokens: 8000,
      responseMimeType: "application/json",
    },
  })
  const content = response.text
  if (!content) throw new Error("Gemini returned an empty response")
  return parseJson(content)
}

export async function detectAi(text: string) {
  return runTool(
    `You are an AI-content detection expert. Analyze the text and return ONLY valid JSON with this exact shape:
{
  "aiProbability": number (0-100),
  "verdict": "likely AI-generated" | "possibly AI-generated" | "likely human-written",
  "summary": string (1-2 sentences),
  "signals": string[] (3-6 observations that influenced the score)
}`,
    `Text to analyze:\n"""\n${text}\n"""`
  )
}

export async function paraphrase(text: string, tone: string) {
  return runTool(
    `You are a skilled editor. Paraphrase the given text while preserving meaning. Return ONLY valid JSON:
{
  "paraphrased": string,
  "changes": string[] (3-5 bullet notes on what you changed)
}`,
    `Tone: ${tone}\n\nText:\n"""\n${text}\n"""`
  )
}

export async function writeEssay(
  topic: string,
  style: string,
  length: string
) {
  return runTool(
    `You are an experienced essay writer. Write a well-structured essay. Return ONLY valid JSON:
{
  "title": string,
  "essay": string (full essay, paragraphs separated by blank lines),
  "wordCount": number,
  "outline": string[] (the main points covered)
}`,
    `Topic: ${topic}\nStyle: ${style}\nLength: ${length}`
  )
}

export async function checkGrammar(text: string) {
  return runTool(
    `You are a strict grammar and spelling checker. Return ONLY valid JSON:
{
  "corrected": string (the full text with all fixes applied),
  "issues": [{ "original": string, "correction": string, "explanation": string }],
  "score": number (0-100 quality score)
}
If no issues, return issues: [] and the original text as corrected.`,
    `Text:\n"""\n${text}\n"""`
  )
}

export async function summarize(text: string, format: string) {
  return runTool(
    `You are an expert summarizer. Return ONLY valid JSON:
{
  "summary": string (the summary),
  "keyPoints": string[] (4-8 key points),
  "readingTimeSeconds": number (estimated seconds to read the summary)
}`,
    `Format: ${format}\n\nDocument:\n"""\n${text}\n"""`
  )
}
