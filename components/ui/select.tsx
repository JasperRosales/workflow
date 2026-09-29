"use client"

import * as React from "react"
import { Select as BaseSelect } from "@base-ui/react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = BaseSelect.Root
const SelectGroup = BaseSelect.Group
const SelectValue = BaseSelect.Value

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BaseSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between border-2 border-foreground bg-background px-3 py-2 text-sm font-bold tracking-wide uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-3 focus:ring-ring/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <BaseSelect.Icon asChild>
      <ChevronDown className="size-4 opacity-50" />
    </BaseSelect.Icon>
  </BaseSelect.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseSelect.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <BaseSelect.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="size-4" />
  </BaseSelect.ScrollUpButton>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseSelect.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <BaseSelect.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="size-4" />
  </BaseSelect.ScrollDownButton>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseSelect.Popup>
>(({ className, children, position = "popper", ...props }, ref) => (
  <BaseSelect.Portal>
    <BaseSelect.Positioner
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden border-2 border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <BaseSelect.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--select-trigger-height)] w-full min-w-[var(--select-trigger-width)] scroll-my-1 overflow-x-hidden overflow-y-auto"
        )}
      >
        {children}
      </BaseSelect.Viewport>
      <SelectScrollDownButton />
    </BaseSelect.Positioner>
  </BaseSelect.Portal>
))
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseSelect.GroupLabel>
>(({ className, ...props }, ref) => (
  <BaseSelect.GroupLabel
    ref={ref}
    className={cn(
      "py-1.5 pr-2 pl-8 text-xs font-bold tracking-wide text-muted-foreground uppercase",
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default items-center py-1.5 pr-2 pl-8 text-sm font-medium outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <BaseSelect.ItemIndicator>
        <Check className="size-4" />
      </BaseSelect.ItemIndicator>
    </span>
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
))
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseSelect.Separator>
>(({ className, ...props }, ref) => (
  <BaseSelect.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
