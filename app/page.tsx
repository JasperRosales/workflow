"use client"

import * as React from "react"
import Link from "next/link"
import {
  FileText,
  Sparkles,
  Brain,
  RefreshCw,
  FileSearch,
  PenTool,
  FileIcon,
  CheckCircle,
  Wand2,
} from "lucide-react"

const allTools = [
  {
    href: "/builder",
    icon: FileText,
    title: "CV Builder",
    description:
      "Create professional resumes with multiple templates and real-time preview.",
    color: "bg-amber-500",
  },
  {
    href: "/analyzer",
    icon: Sparkles,
    title: "Resume Analyzer",
    description:
      "Analyze your resume for ATS compatibility and get improvement suggestions.",
    color: "bg-emerald-500",
  },
  {
    href: "#",
    icon: Brain,
    title: "AI Word Detector",
    description: "Detect AI-generated content in your text.",
    color: "bg-violet-500",
  },
  {
    href: "#",
    icon: RefreshCw,
    title: "Paraphraser",
    description: "Rewrite text with AI while preserving meaning.",
    color: "bg-blue-500",
  },
  {
    href: "#",
    icon: FileSearch,
    title: "Citation Generator",
    description: "Generate citations in various formats easily.",
    color: "bg-rose-500",
  },
  {
    href: "#",
    icon: PenTool,
    title: "Essay Writer",
    description: "Write essays with AI assistance.",
    color: "bg-cyan-500",
  },
  {
    href: "#",
    icon: FileIcon,
    title: "PDF Converter",
    description: "Convert files to and from PDF format.",
    color: "bg-orange-500",
  },
  {
    href: "#",
    icon: CheckCircle,
    title: "Grammar Checker",
    description: "Check grammar and spelling in your text.",
    color: "bg-teal-500",
  },
  {
    href: "#",
    icon: Wand2,
    title: "AI Summarizer",
    description: "Summarize long documents into key points.",
    color: "bg-pink-500",
  },
]

const categories = [
  {
    title: "All",
    tools: allTools,
  },
  {
    title: "Work",
    tools: allTools.filter((t) =>
      ["CV Builder", "Resume Analyzer", "AI Word Detector", "Paraphraser"].includes(t.title)
    ),
  },
  {
    title: "Academic",
    tools: allTools.filter((t) =>
      ["Citation Generator", "Essay Writer", "AI Summarizer"].includes(t.title)
    ),
  },
  {
    title: "Others",
    tools: allTools.filter((t) =>
      ["PDF Converter", "Grammar Checker"].includes(t.title)
    ),
  },
]

export default function Home() {
  return (
    <div className="min-h-svh bg-background">
      <div className="border-b-2 border-foreground bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex size-10 items-center justify-center border-2 border-foreground bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FileText className="size-5" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold tracking-tight uppercase sm:text-2xl">
              Workflow
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              CV Builder & Resume Analyzer
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight uppercase sm:text-3xl animate-fade-in-up">
            Every tool you need, in one place
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base animate-fade-in-up animation-delay-100">
            All tools are 100% FREE and easy to use!
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.title}
              className="border-2 border-foreground bg-background px-4 py-2 text-sm font-bold tracking-wide uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTools.map((tool, index) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group relative flex flex-col border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up"
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative flex items-start gap-4">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center border-2 border-foreground text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-110 ${tool.color}`}
                >
                  <tool.icon className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold tracking-wide uppercase">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
