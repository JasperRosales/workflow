import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full border-2 border-foreground bg-background px-3 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-muted-foreground/60 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
