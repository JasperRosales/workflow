"use client"

import * as React from "react"
import { Separator as BaseSeparator } from "@base-ui/react"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseSeparator>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <BaseSeparator
    ref={ref}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-0.5 w-full" : "h-full w-0.5",
      className
    )}
    {...props}
  />
))
Separator.displayName = "Separator"

export { Separator }
