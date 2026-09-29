"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BaseSwitch.Root>
>(({ className, ...props }, ref) => (
  <BaseSwitch.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border-2 border-foreground bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-foreground",
      className
    )}
    {...props}
  >
    <BaseSwitch.Thumb
      className={cn(
        "pointer-events-none block size-4 border-2 border-foreground bg-background shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-transform data-[checked]:translate-x-5 data-[unchecked]:translate-x-0"
      )}
    />
  </BaseSwitch.Root>
))
Switch.displayName = "Switch"

export { Switch }
