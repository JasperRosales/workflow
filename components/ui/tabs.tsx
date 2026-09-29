"use client"

import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react"

import { cn } from "@/lib/utils"

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseTabs.Root>
>(({ className, ...props }, ref) => (
  <BaseTabs.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center border-2 border-foreground bg-muted p-1 text-muted-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-1.5 border-2 border-transparent px-3 py-1.5 text-sm font-bold tracking-wide whitespace-nowrap uppercase transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[selected]:border-foreground data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] [&_svg]:size-4",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseTabs.Panel>
>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={cn(
      "mt-2 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
