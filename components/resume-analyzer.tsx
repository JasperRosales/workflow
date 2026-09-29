"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import {
  BarChart3,
  CircleCheck,
  Download,
  LoaderCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react"

import type { AnalysisResult } from "@/lib/types"
import {
  buildReportHtml,
  buildReportMarkdown,
  sanitizeFileName,
} from "@/lib/report"

import { UploadZone } from "@/components/upload-zone"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

const ResultsView = dynamic(
  () => import("@/components/results-view").then((mod) => mod.ResultsView),
  { loading: () => <ResultsViewLoading /> }
)

type Status =
  "idle" | "uploading" | "parsing" | "analyzing" | "success" | "error"

const STEPS = [
  { key: "uploading", label: "Uploading resume..." },
  { key: "parsing", label: "Extracting text..." },
  { key: "analyzing", label: "Running ATS analysis..." },
] as const

const PLACEHOLDER_HIGHLIGHTS = [
  "ATS compatibility score",
  "Keyword match analysis",
  "Missing skills & skill gaps",
  "Formatting & grammar fixes",
  "Resume rewrites & interview tips",
]

function ResultsPlaceholder() {
  return (
    <div className="flex min-h-[32rem] flex-col items-center justify-center gap-6 border-2 border-dashed border-foreground bg-muted/20 p-8 text-center sm:p-12">
      <span className="flex size-14 items-center justify-center border-2 border-foreground bg-primary/10 text-primary">
        <BarChart3 className="size-7" />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-xl font-bold tracking-wide uppercase">
          Your analysis will appear here
        </h2>
        <p className="mx-auto max-w-md text-sm text-pretty text-muted-foreground">
          Upload a PDF or DOCX resume and click{" "}
          <span className="font-bold text-foreground">Analyze Resume</span>. The
          full ATS report is shown on this side while your inputs stay visible
          on the left.
        </p>
      </div>
      <ul className="flex max-w-md flex-wrap items-center justify-center gap-2">
        {PLACEHOLDER_HIGHLIGHTS.map((item) => (
          <li
            key={item}
            className="flex items-center gap-1.5 border-2 border-foreground bg-card px-3 py-1 text-xs text-muted-foreground"
          >
            <CircleCheck className="size-3.5 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ResultsViewLoading() {
  return (
    <div className="flex min-h-[32rem] flex-col gap-6">
      <div className="flex items-center gap-6">
        <Skeleton className="size-36" />
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-56 w-full" />
    </div>
  )
}

export function ResumeAnalyzer() {
  const [file, setFile] = React.useState<File | null>(null)
  const [jobDescription, setJobDescription] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [result, setResult] = React.useState<AnalysisResult | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const busy =
    status === "uploading" || status === "parsing" || status === "analyzing"

  async function handleAnalyze() {
    if (!file || busy) return

    setStatus("uploading")
    setActiveIndex(0)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)
    if (jobDescription.trim())
      formData.append("jobDescription", jobDescription.trim())

    try {
      setActiveIndex(1)
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        setStatus("error")
        setError(
          data?.error ??
            "Something went wrong while analyzing your resume. Please try again."
        )
        return
      }

      setActiveIndex(2)
      setStatus("success")
      setResult(data as AnalysisResult)
    } catch {
      setStatus("error")
      setError("Network error. Please check your connection and try again.")
    }
  }

  function handleReset() {
    setFile(null)
    setJobDescription("")
    setStatus("idle")
    setResult(null)
    setError(null)
  }

  function downloadBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = fileName
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  function handleDownload(format: "markdown" | "html") {
    if (!result) return
    const base = sanitizeFileName(result.fileName)
    if (format === "html") {
      downloadBlob(
        new Blob([buildReportHtml(result)], {
          type: "text/html;charset=utf-8",
        }),
        `${base}-analysis-report.html`
      )
    } else {
      downloadBlob(
        new Blob([buildReportMarkdown(result)], {
          type: "text/markdown;charset=utf-8",
        }),
        `${base}-analysis-report.md`
      )
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center border-2 border-foreground bg-primary/10 text-primary">
          <Sparkles className="size-6" />
        </span>
        <h1 className="font-heading text-3xl font-bold tracking-tight uppercase sm:text-4xl">
          Resume Analyzer
        </h1>
        <p className="max-w-xl text-balance text-muted-foreground">
          Upload your resume to get an ATS compatibility score and actionable
          suggestions. Your file is processed privately and never stored.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)] xl:gap-8">
        <aside className="lg:sticky lg:top-8">
          <div className="flex flex-col gap-5 border-2 border-foreground bg-card p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-6">
            <UploadZone file={file} onFileChange={setFile} disabled={busy} />

            <div className="flex flex-col gap-2">
              <Label htmlFor="job-description">
                Job description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="job-description"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                disabled={busy}
                placeholder="Paste the job description to compare your resume against it and get a tailored match score..."
                rows={5}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={!file || busy}
                size="lg"
                className="flex-1"
              >
                {busy ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    {STEPS[activeIndex]?.label ?? "Analyzing..."}
                  </>
                ) : (
                  <>
                    <Sparkles />
                    Analyze Resume
                  </>
                )}
              </Button>
              {result && (
                <Button variant="outline" size="lg" onClick={handleReset}>
                  <RefreshCw />
                  New analysis
                </Button>
              )}
            </div>

            {busy && (
              <ol className="flex flex-col gap-1.5">
                {STEPS.map((step, index) => (
                  <li
                    key={step.key}
                    className="flex items-center gap-2 text-sm"
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    {index < activeIndex ? (
                      <CircleCheck className="size-4 text-emerald-500" />
                    ) : index === activeIndex ? (
                      <LoaderCircle className="size-4 animate-spin text-primary" />
                    ) : (
                      <span className="size-4 border-2 border-border" />
                    )}
                    <span
                      className={
                        index === activeIndex
                          ? "text-foreground"
                          : index < activeIndex
                            ? "text-muted-foreground"
                            : "text-muted-foreground/60"
                      }
                    >
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            {status === "error" && error && (
              <div className="border-2 border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
        </aside>

        <section className="flex min-w-0 flex-col gap-4">
          {result ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h2 className="font-heading text-lg font-bold tracking-wide uppercase">
                    Analysis report
                  </h2>
                  <p className="truncate text-sm text-muted-foreground">
                    {result.fileName} - {result.wordCount} words - analyzed in{" "}
                    {(result.durationMs / 1000).toFixed(1)}s
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload("markdown")}
                  >
                    <Download />
                    Markdown report
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload("html")}
                  >
                    <Download />
                    HTML report
                  </Button>
                </div>
              </div>
              <ResultsView result={result} />
            </>
          ) : (
            <ResultsPlaceholder />
          )}
        </section>
      </div>
    </div>
  )
}
