"use client"

import * as React from "react"

import {
  useTool,
  inputClass,
  selectClass,
  submitClass,
  ToolResult,
  ResultCard,
} from "@/components/tool-shell"
import { Footer } from "@/components/footer"
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const tabs = [
  { id: "detector", label: "AI Detector" },
  { id: "paraphraser", label: "Paraphraser" },
  { id: "essay", label: "Essay Writer" },
  { id: "grammar", label: "Grammar" },
  { id: "summarizer", label: "Summarizer" },
] as const

type TabId = (typeof tabs)[number]["id"]

export default function ToolsPage() {
  const [active, setActive] = React.useState<TabId>("detector")
  const headerHidden = useHideOnScroll()

  return (
    <div className="paper-grid flex min-h-svh flex-col">
      <div
        className={`sticky top-0 z-40 border-b border-foreground/20 bg-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-300 ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex size-10 items-center justify-center border-2 border-foreground bg-foreground text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="font-heading text-xl font-bold tracking-tight uppercase sm:text-2xl text-shadow-3d">
              Tools
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              AI-powered writing tools
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`border-2 border-foreground px-4 py-2 text-sm font-bold tracking-wide uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                active === tab.id ? "bg-foreground text-background" : "bg-background"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === "detector" && <DetectorTool />}
        {active === "paraphraser" && <ParaphraserTool />}
        {active === "essay" && <EssayTool />}
        {active === "grammar" && <GrammarTool />}
        {active === "summarizer" && <SummarizerTool />}
      </div>

      <Footer />
    </div>
  )
}

interface DetectResult {
  aiProbability: number
  verdict: string
  summary: string
  signals: string[]
}

function DetectorTool() {
  const [text, setText] = React.useState("")
  const { data, error, loading, run } = useTool<DetectResult>("/api/detect")
  return (
    <>
      <textarea
        className={`${inputClass} min-h-56`}
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className={`${submitClass} mt-4`}
        disabled={loading || !text.trim()}
        onClick={() => run({ text })}
      >
        Detect
      </button>
      <ToolResult loading={loading} error={error}>
        {data && (
          <ResultCard title="Detection Result">
            <p className="font-heading text-3xl font-bold">
              {data.aiProbability}%{" "}
              <span className="text-base font-normal text-muted-foreground">
                AI probability
              </span>
            </p>
            <p className="mt-1 text-sm font-bold uppercase">{data.verdict}</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.summary}</p>
            <ul className="mt-3 list-disc pl-5 text-sm">
              {data.signals?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </ResultCard>
        )}
      </ToolResult>
    </>
  )
}

interface ParaphraseResult {
  paraphrased: string
  changes: string[]
}

function ParaphraserTool() {
  const [text, setText] = React.useState("")
  const [tone, setTone] = React.useState("neutral")
  const { data, error, loading, run } =
    useTool<ParaphraseResult>("/api/paraphrase")
  return (
    <>
      <textarea
        className={`${inputClass} min-h-56`}
        placeholder="Paste the text to paraphrase..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-4 flex items-center gap-3">
        <select
          className={selectClass}
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="neutral">Neutral</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="academic">Academic</option>
          <option value="concise">Concise</option>
        </select>
        <button
          className={submitClass}
          disabled={loading || !text.trim()}
          onClick={() => run({ text, tone })}
        >
          Paraphrase
        </button>
      </div>
      <ToolResult loading={loading} error={error}>
        {data && (
          <ResultCard title="Paraphrased">
            <p className="whitespace-pre-wrap text-sm">{data.paraphrased}</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
              {data.changes?.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </ResultCard>
        )}
      </ToolResult>
    </>
  )
}

interface EssayResult {
  title: string
  essay: string
  wordCount: number
  outline: string[]
}

function EssayTool() {
  const [topic, setTopic] = React.useState("")
  const [style, setStyle] = React.useState("formal")
  const [length, setLength] = React.useState("medium (~500 words)")
  const { data, error, loading, run } = useTool<EssayResult>("/api/essay")
  return (
    <>
      <input
        className={inputClass}
        placeholder="Enter your essay topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          className={selectClass}
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="formal">Formal</option>
          <option value="persuasive">Persuasive</option>
          <option value="narrative">Narrative</option>
          <option value="expository">Expository</option>
        </select>
        <select
          className={selectClass}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        >
          <option value="short (~250 words)">Short</option>
          <option value="medium (~500 words)">Medium</option>
          <option value="long (~900 words)">Long</option>
        </select>
        <button
          className={submitClass}
          disabled={loading || !topic.trim()}
          onClick={() => run({ topic, style, length })}
        >
          Write Essay
        </button>
      </div>
      <ToolResult loading={loading} error={error}>
        {data && (
          <ResultCard title={data.title || "Essay"}>
            <p className="whitespace-pre-wrap text-sm">{data.essay}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              ~{data.wordCount} words
            </p>
            <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
              {data.outline?.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </ResultCard>
        )}
      </ToolResult>
    </>
  )
}

interface GrammarResult {
  corrected: string
  issues: { original: string; correction: string; explanation: string }[]
  score: number
}

function GrammarTool() {
  const [text, setText] = React.useState("")
  const { data, error, loading, run } =
    useTool<GrammarResult>("/api/grammar")
  return (
    <>
      <textarea
        className={`${inputClass} min-h-56`}
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className={`${submitClass} mt-4`}
        disabled={loading || !text.trim()}
        onClick={() => run({ text })}
      >
        Check Grammar
      </button>
      <ToolResult loading={loading} error={error}>
        {data && (
          <ResultCard title={`Score: ${data.score}/100`}>
            <p className="whitespace-pre-wrap text-sm">{data.corrected}</p>
            {data.issues?.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm">
                {data.issues.map((issue, i) => (
                  <li key={i}>
                    <span className="line-through text-red-600">
                      {issue.original}
                    </span>{" "}
                    → <span className="font-bold">{issue.correction}</span>
                    <p className="text-xs text-muted-foreground">
                      {issue.explanation}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </ResultCard>
        )}
      </ToolResult>
    </>
  )
}

interface SummaryResult {
  summary: string
  keyPoints: string[]
  readingTimeSeconds: number
}

function SummarizerTool() {
  const [text, setText] = React.useState("")
  const [format, setFormat] = React.useState("concise paragraph")
  const { data, error, loading, run } =
    useTool<SummaryResult>("/api/summarize")
  return (
    <>
      <textarea
        className={`${inputClass} min-h-56`}
        placeholder="Paste the document to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-4 flex items-center gap-3">
        <select
          className={selectClass}
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="concise paragraph">Paragraph</option>
          <option value="bullet points">Bullet Points</option>
          <option value="one sentence">One Sentence</option>
        </select>
        <button
          className={submitClass}
          disabled={loading || !text.trim()}
          onClick={() => run({ text, format })}
        >
          Summarize
        </button>
      </div>
      <ToolResult loading={loading} error={error}>
        {data && (
          <ResultCard title="Summary">
            <p className="whitespace-pre-wrap text-sm">{data.summary}</p>
            <ul className="mt-3 list-disc pl-5 text-sm">
              {data.keyPoints?.map((k, i) => <li key={i}>{k}</li>)}
            </ul>
          </ResultCard>
        )}
      </ToolResult>
    </>
  )
}
