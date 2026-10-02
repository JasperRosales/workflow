"use client"

import * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => (
    <BaseProgress.Root
      ref={ref}
      value={value}
      max={max}
      className={cn(
        "relative h-4 w-full overflow-hidden border-2 border-foreground bg-background",
        className
      )}
      {...props}
    />
  )
)
Progress.displayName = "Progress"

const ProgressTrack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-full w-full", className)}
    {...props}
  />
))
ProgressTrack.displayName = "ProgressTrack"

const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseProgress.Indicator>
>(({ className, ...props }, ref) => (
  <BaseProgress.Indicator
    ref={ref}
    className={cn("h-full w-full flex-1 transition-all", className)}
    {...props}
  />
))
ProgressIndicator.displayName = "ProgressIndicator"

export { Progress, ProgressTrack, ProgressIndicator }
