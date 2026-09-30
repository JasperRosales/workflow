"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, ArrowLeft } from "lucide-react"

import { ResumeAnalyzer } from "@/components/resume-analyzer"

export default function AnalyzerPage() {
  return (
    <div className="min-h-svh bg-background">
      <div className="border-b-2 border-foreground bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex size-10 items-center justify-center border-2 border-foreground bg-cyan-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex size-10 items-center justify-center border-2 border-foreground bg-cyan-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold tracking-tight uppercase sm:text-2xl">
              Resume Analyzer
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Analyze resumes for ATS compatibility
            </p>
          </div>
        </div>
      </div>

      <ResumeAnalyzer />
    </div>
  )
}
