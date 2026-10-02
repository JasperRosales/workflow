"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll"

export function ToolShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
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
              {title}
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </div>

      <Footer />
    </div>
  )
}

export function useTool<T = Record<string, unknown>>(endpoint: string) {
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const run = async (payload: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Request failed")
      setData(json as T)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed")
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, run }
}

export const inputClass =
  "w-full border-2 border-foreground bg-card p-3 text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none"

export const selectClass =
  "border-2 border-foreground bg-card px-3 py-2 text-sm font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"

export const submitClass =
  "border-2 border-foreground bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-wide text-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 flex items-center gap-2"

export function ToolResult({
  loading,
  error,
  children,
}: {
  loading: boolean
  error: string | null
  children: React.ReactNode
}) {
  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Working on it...
      </div>
    )
  }
  if (error) {
    return (
      <p className="mt-6 border-2 border-foreground bg-card p-3 text-sm text-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {error}
      </p>
    )
  }
  return <>{children}</>
}

export function ResultCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-6 border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  )
}
