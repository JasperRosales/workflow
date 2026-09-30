"use client"

import * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseProgress.Root>
>(({ className, ...props }, ref) => (
  <BaseProgress.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden border-2 border-foreground bg-background",
      className
    )}
    {...props}
  />
))
Progress.displayName = "Progress"

const ProgressTrack = Progress

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
