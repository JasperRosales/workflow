"use client"

import * as React from "react"
import { Label as BaseLabel } from "@base-ui/react"

import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<typeof BaseLabel>
>(({ className, ...props }, ref) => (
  <BaseLabel
    ref={ref}
    className={cn(
      "text-sm font-bold tracking-wide text-foreground uppercase",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
