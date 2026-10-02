"use client"

import * as React from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Footer } from "@/components/footer"
import {
  CvBuilderIcon,
  AnalyzerIcon,
  DetectorIcon,
  CitationIcon,
  PdfIcon,
} from "@/components/tool-icons"

const allTools = [
  {
    href: "/builder",
    icon: CvBuilderIcon,
    title: "CV Builder",
    description:
      "Create professional resumes with multiple templates and real-time preview.",
  },
  {
    href: "/analyzer",
    icon: AnalyzerIcon,
    title: "Resume Analyzer",
    description:
      "Analyze your resume for ATS compatibility and get improvement suggestions.",
  },
  {
    href: "/tools",
    icon: DetectorIcon,
    title: "AI Tools",
    description:
      "AI word detector, paraphraser, essay writer, grammar checker, and summarizer in one place.",
  },
  {
    href: "#",
    icon: CitationIcon,
    title: "Citation Generator",
    description: "Generate citations in various formats easily.",
  },
  {
    href: "#",
    icon: PdfIcon,
    title: "PDF Converter",
    description: "Convert files to and from PDF format.",
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
      ["CV Builder", "Resume Analyzer", "AI Tools"].includes(t.title)
    ),
  },
  {
    title: "Academic",
    tools: allTools.filter((t) =>
      ["Citation Generator"].includes(t.title)
    ),
  },
  {
    title: "Others",
    tools: allTools.filter((t) =>
      ["PDF Converter"].includes(t.title)
    ),
  },
]

export default function Home() {
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const [activeCategory, setActiveCategory] = React.useState("All")
  const visibleTools =
    categories.find((c) => c.title === activeCategory)?.tools ?? allTools

  return (
    <div className="paper-grid flex min-h-svh flex-col">
      <div className="sticky top-0 z-40 border-b border-foreground/20 bg-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-heading text-xl font-bold tracking-tight uppercase sm:text-2xl text-shadow-3d">
              Workflow
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              A setup of tools for efficient workflows
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
              onClick={() => setActiveCategory(cat.title)}
              className={`border-2 border-foreground px-4 py-2 text-sm font-bold tracking-wide uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                activeCategory === cat.title
                  ? "bg-foreground text-background"
                  : "bg-background"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTools.map((tool, index) => {
            const inner = (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative flex items-start gap-4">
                  <tool.icon className="size-12 shrink-0 grayscale transition-transform group-hover:scale-110" />
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold tracking-wide uppercase">
                      {tool.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </>
            )
            const className =
              "group relative flex flex-col border-2 border-foreground bg-card p-5 text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up"
            const style = { animationDelay: `${(index + 2) * 50}ms` }
            return tool.href === "#" ? (
              <button
                key={tool.title}
                type="button"
                onClick={() => setSelectedTool(tool.title)}
                className={className}
                style={style}
              >
                {inner}
              </button>
            ) : (
              <Link key={tool.title} href={tool.href} className={className} style={style}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>

      <Dialog
        open={selectedTool !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTool(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTool}</DialogTitle>
            <DialogDescription>
              This tool is yet to be uploaded. Please check back later!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
