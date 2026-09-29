"use client"

import { cn } from "@/lib/utils"

function ringColor(score: number): string {
  if (score >= 80) return "text-emerald-500"
  if (score >= 60) return "text-amber-500"
  return "text-red-500"
}

function ringTrack(score: number): string {
  if (score >= 80) return "stroke-emerald-500/20"
  if (score >= 60) return "stroke-amber-500/20"
  return "stroke-red-500/20"
}

export function AtsScoreRing({
  score,
  size = 180,
}: {
  score: number
  size?: number
}) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, score))
  const offset = circumference * (1 - clamped / 100)

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        role="img"
        aria-label={`ATS compatibility score: ${clamped} out of 100`}
      >
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="14"
          className={cn("stroke-current", ringTrack(clamped))}
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          className={cn(
            "stroke-current transition-all duration-1000 ease-out",
            ringColor(clamped)
          )}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className={cn(
            "font-heading font-bold tabular-nums",
            ringColor(clamped)
          )}
          style={{ fontSize: size * 0.22 }}
        >
          {clamped}
        </span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}
