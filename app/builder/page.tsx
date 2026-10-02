"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Footer } from "@/components/footer"
import { ResumeBuilder } from "@/components/resume-builder"
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll"

export default function BuilderPage() {
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
              CV Builder
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Create professional resumes
            </p>
          </div>
        </div>
      </div>

      <ResumeBuilder />

      <Footer />
    </div>
  )
}
