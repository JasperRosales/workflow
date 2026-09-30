"use client"

import * as React from "react"
import { Tooltip as BaseTooltip } from "@base-ui/react"

import { cn } from "@/lib/utils"

const TooltipProvider = BaseTooltip.Provider
const TooltipRoot = BaseTooltip.Root
const TooltipTrigger = BaseTooltip.Trigger

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseTooltip.Positioner>
>(({ className, ...props }, ref) => (
  <BaseTooltip.Portal>
    <BaseTooltip.Positioner
      ref={ref}
      className={cn(
        "z-50 animate-in overflow-hidden border-2 border-foreground bg-background px-3 py-1.5 text-sm font-bold tracking-wide text-foreground uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      <BaseTooltip.Arrow className="fill-foreground">
        <path d="M0 0L10 10L20 0" />
      </BaseTooltip.Arrow>
      {props.children}
    </BaseTooltip.Positioner>
  </BaseTooltip.Portal>
))
TooltipContent.displayName = "TooltipContent"

const Tooltip = ({
  children,
  ...props
}: {
  children: React.ReactNode
} & React.ComponentProps<typeof TooltipRoot>) => (
  <TooltipRoot {...props}>{children}</TooltipRoot>
)

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
