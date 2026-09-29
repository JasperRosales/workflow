"use client"

import * as React from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BaseCheckbox.Root>
>(({ className, ...props }, ref) => (
  <BaseCheckbox.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 border-2 border-foreground bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-foreground data-[checked]:text-background",
      className
    )}
    {...props}
  >
    <BaseCheckbox.Indicator className="flex items-center justify-center text-current">
      <Check className="size-3" />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
