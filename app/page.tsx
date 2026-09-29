"use client"

import * as React from "react"
import { FileText, Sparkles } from "lucide-react"

import { ResumeBuilder } from "@/components/resume-builder"
import { ResumeAnalyzer } from "@/components/resume-analyzer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

      <Tabs defaultValue="builder" className="w-full">
        <div className="border-b-2 border-foreground bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TabsList className="h-12 w-full justify-start gap-2 rounded-none border-0 bg-transparent p-0">
              <TabsTrigger
                value="builder"
                className="flex-1 border-2 border-transparent px-4 py-2 text-sm font-bold tracking-wide uppercase transition-all data-[selected]:border-foreground data-[selected]:bg-background data-[selected]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:flex-none"
              >
                <FileText />
                CV Builder
              </TabsTrigger>
              <TabsTrigger
                value="analyzer"
                className="flex-1 border-2 border-transparent px-4 py-2 text-sm font-bold tracking-wide uppercase transition-all data-[selected]:border-foreground data-[selected]:bg-background data-[selected]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:flex-none"
              >
                <Sparkles />
                Resume Analyzer
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="builder" className="mt-0">
          <ResumeBuilder />
        </TabsContent>

        <TabsContent value="analyzer" className="mt-0">
          <ResumeAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  )
}
