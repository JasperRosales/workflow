import { GoogleGenAI } from "@google/genai"
import type { AnalysisInput, AnalysisResult, ResumeAnalysis } from "./types"
import { countWords, normalizeText } from "./parse"

export const ANALYSIS_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.6-flash"

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured")
  }
  return new GoogleGenAI({ apiKey })
}

const SCHEMA_DESCRIPTION = `Return a JSON object with EXACTLY this shape:
{
  "atsScore": number (0-100 overall ATS compatibility),
  "overallSummary": string (2-3 sentence overview of resume quality),
  "scoreBreakdown": [{ "id": string, "label": string, "score": number (0-100), "weight": number (0-1, weights must sum to 1), "summary": string }],
  "keywordAnalysis": {
    "matched": [{ "keyword": string, "found": true, "count": number, "context": string }],
    "missing": [{ "keyword": string, "found": false, "count": 0, "context": string }]
  },
  "missingSkills": string[],
  "formattingIssues": [{ "severity": "critical" | "warning" | "info", "issue": string, "suggestion": string }],
  "grammarIssues": [{ "original": string, "correction": string, "suggestion": string }],
  "recommendations": string[] (prioritized, actionable),
  "jobMatch": {
    "matchPercent": number (0-100),
    "strengths": string[],
    "gaps": string[],
    "note": string
  } | null,
  "summaryAnalysis": { "quality": "excellent" | "good" | "fair" | "poor", "score": number (0-100), "feedback": string[] },
  "rewriteSuggestions": [{ "section": string, "original": string, "suggested": string, "rationale": string }],
  "coverLetterSuggestions": string[],
  "skillGaps": [{ "skill": string, "priority": "high" | "medium" | "low", "howToAcquire": string }],
  "interviewTips": [{ "question": string, "why": string, "advice": string }]
}`

function buildSystemPrompt(hasJobDescription: boolean): string {
  const jobDescriptionInstructions = hasJobDescription
    ? `The user has provided a job description. Use it to score keyword matching, detect missing skills, compute the jobMatch.matchPercent, and tailor the skills gap analysis and interview tips to the role.`
    : `No job description was provided. For keywordAnalysis, infer a reasonable set of keywords from the resume's own content and the likely target role. Set jobMatch to null, and keep missingSkills / skillGaps generic and role-agnostic.`

  return `You are a senior technical recruiter and resume expert with deep knowledge of Applicant Tracking Systems (ATS) such as Workday, Taleo, Greenhouse, and Lever.

Analyze the resume thoroughly and ${SCHEMA_DESCRIPTION}

Rules:
- keywordAnalysis: list 10-25 keywords. When a job description is given, prioritize its explicit keywords; otherwise infer them from the resume. Include a "context" snippet from the resume for matched keywords, or an empty string for missing ones.
- formattingIssues: flag ATS-hostile formatting (tables, columns, graphics, headers/footers, no standard section headings, inconsistent dates, fonts, file naming, etc.).
- grammarIssues: list real spelling/grammar/punctuation mistakes with corrected versions. If none, return [].
- recommendations: 5-10 concise, prioritized actions ordered by impact.
- rewriteSuggestions: 3-6 before/after rewrites of actual resume bullet points or sections (quote the real original text, then give a stronger suggested version).
- interviewTips: 3-5 questions likely asked based on the resume content, why they'd be asked, and how to answer well.
- Be honest and specific. Quote actual resume text where relevant. Never invent facts not present in the resume.
- ${jobDescriptionInstructions}
- Return ONLY valid JSON. No markdown, no commentary.`
}

export function parseModelJson(content: string): ResumeAnalysis {
  let text = content.trim()
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) {
    text = fence[1].trim()
  }
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model response did not contain a JSON object")
  }
  return JSON.parse(text.slice(start, end + 1)) as ResumeAnalysis
}

function clampScore(score: unknown, fallback: number): number {
  if (typeof score !== "number" || Number.isNaN(score)) return fallback
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function validateAnalysis(raw: ResumeAnalysis): ResumeAnalysis {
  const scoreBreakdown = Array.isArray(raw.scoreBreakdown)
    ? raw.scoreBreakdown
    : []
  const breakdown = scoreBreakdown.map((category) => ({
    id: String(category.id ?? category.label)
      .toLowerCase()
      .replace(/\s+/g, "-"),
    label: String(category.label ?? "Category"),
    score: clampScore(category.score, 50),
    weight:
      typeof category.weight === "number"
        ? Math.max(0, Math.min(1, category.weight))
        : 0,
    summary: String(category.summary ?? ""),
  }))

  const totalWeight = breakdown.reduce((sum, c) => sum + c.weight, 0)
  if (totalWeight > 0) {
    breakdown.forEach(
      (c) => (c.weight = Math.round((c.weight / totalWeight) * 100) / 100)
    )
  }

  const keywordAnalysis = {
    matched: Array.isArray(raw.keywordAnalysis?.matched)
      ? raw.keywordAnalysis.matched.map((k) => ({
          keyword: String(k.keyword ?? ""),
          found: true,
          count: clampScore(k.count, 1),
          context: String(k.context ?? ""),
        }))
      : [],
    missing: Array.isArray(raw.keywordAnalysis?.missing)
      ? raw.keywordAnalysis.missing.map((k) => ({
          keyword: String(k.keyword ?? ""),
          found: false,
          count: 0,
          context: String(k.context ?? ""),
        }))
      : [],
  }

  const weightedScore = Math.round(
    breakdown.reduce((sum, c) => sum + c.score * c.weight, 0)
  )

  return {
    atsScore: clampScore(raw.atsScore, weightedScore),
    overallSummary: String(raw.overallSummary ?? ""),
    scoreBreakdown: breakdown,
    keywordAnalysis,
    missingSkills: (Array.isArray(raw.missingSkills)
      ? raw.missingSkills
      : []
    ).map(String),
    formattingIssues: (Array.isArray(raw.formattingIssues)
      ? raw.formattingIssues
      : []
    ).map((f) => ({
      severity: (f.severity === "critical" ||
      f.severity === "warning" ||
      f.severity === "info"
        ? f.severity
        : "info") as ResumeAnalysis["formattingIssues"][number]["severity"],
      issue: String(f.issue ?? ""),
      suggestion: String(f.suggestion ?? ""),
    })),
    grammarIssues: (Array.isArray(raw.grammarIssues)
      ? raw.grammarIssues
      : []
    ).map((g) => ({
      original: String(g.original ?? ""),
      correction: String(g.correction ?? ""),
      suggestion: String(g.suggestion ?? ""),
    })),
    recommendations: (Array.isArray(raw.recommendations)
      ? raw.recommendations
      : []
    ).map(String),
    jobMatch:
      raw.jobMatch && typeof raw.jobMatch === "object"
        ? {
            matchPercent: clampScore(raw.jobMatch.matchPercent, 0),
            strengths: (Array.isArray(raw.jobMatch.strengths)
              ? raw.jobMatch.strengths
              : []
            ).map(String),
            gaps: (Array.isArray(raw.jobMatch.gaps)
              ? raw.jobMatch.gaps
              : []
            ).map(String),
            note: String(raw.jobMatch.note ?? ""),
          }
        : undefined,
    summaryAnalysis: {
      quality: (raw.summaryAnalysis?.quality === "excellent" ||
      raw.summaryAnalysis?.quality === "good" ||
      raw.summaryAnalysis?.quality === "fair" ||
      raw.summaryAnalysis?.quality === "poor"
        ? raw.summaryAnalysis.quality
        : "fair") as ResumeAnalysis["summaryAnalysis"]["quality"],
      score: clampScore(raw.summaryAnalysis?.score, 0),
      feedback: (Array.isArray(raw.summaryAnalysis?.feedback)
        ? raw.summaryAnalysis.feedback
        : []
      ).map(String),
    },
    rewriteSuggestions: (Array.isArray(raw.rewriteSuggestions)
      ? raw.rewriteSuggestions
      : []
    ).map((r) => ({
      section: String(r.section ?? ""),
      original: String(r.original ?? ""),
      suggested: String(r.suggested ?? ""),
      rationale: String(r.rationale ?? ""),
    })),
    coverLetterSuggestions: (Array.isArray(raw.coverLetterSuggestions)
      ? raw.coverLetterSuggestions
      : []
    ).map(String),
    skillGaps: (Array.isArray(raw.skillGaps) ? raw.skillGaps : []).map((s) => ({
      skill: String(s.skill ?? ""),
      priority: (s.priority === "high" ||
      s.priority === "medium" ||
      s.priority === "low"
        ? s.priority
        : "medium") as ResumeAnalysis["skillGaps"][number]["priority"],
      howToAcquire: String(s.howToAcquire ?? ""),
    })),
    interviewTips: (Array.isArray(raw.interviewTips)
      ? raw.interviewTips
      : []
    ).map((t) => ({
      question: String(t.question ?? ""),
      why: String(t.why ?? ""),
      advice: String(t.advice ?? ""),
    })),
  }
}

export async function analyzeResume(
  input: AnalysisInput
): Promise<AnalysisResult> {
  const startedAt = Date.now()

  const resumeText = normalizeText(input.resumeText)
  const jobDescription = input.jobDescription?.trim()

  const userPrompt = `Resume file name: ${input.fileName}
Resume text:
"""
${resumeText}
"""

${
  jobDescription
    ? `Job description:
"""
${jobDescription}
"""`
    : ""
}`

  const client = getClient()
  const response = await client.models.generateContent({
    model: ANALYSIS_MODEL,
    contents: userPrompt,
    config: {
      systemInstruction: buildSystemPrompt(Boolean(jobDescription)),
      temperature: 0.3,
      maxOutputTokens: 12000,
      responseMimeType: "application/json",
    },
  })

  const content = response.text
  if (!content) {
    throw new Error("Gemini returned an empty response")
  }

  const raw = parseModelJson(content)
  const analysis = validateAnalysis(raw)

  return {
    analysis,
    resumeText,
    wordCount: countWords(resumeText),
    fileName: input.fileName,
    model: ANALYSIS_MODEL,
    durationMs: Date.now() - startedAt,
  }
}
