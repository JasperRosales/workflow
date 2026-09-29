"use client"

import * as React from "react"
import { Accordion as BaseAccordion } from "@base-ui/react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = BaseAccordion.Root

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseAccordion.Item>
>(({ className, ...props }, ref) => (
  <BaseAccordion.Item
    ref={ref}
    className={cn("border-b-2 border-foreground/10", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BaseAccordion.Header>
>(({ className, children, ...props }, ref) => (
  <BaseAccordion.Header>
    <BaseAccordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-bold tracking-wide uppercase transition-all hover:underline [&[data-open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
    </BaseAccordion.Trigger>
  </BaseAccordion.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseAccordion.Panel>
>(({ className, children, ...props }, ref) => (
  <BaseAccordion.Panel
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[ending-height]:animate-accordion-up data-[starting-height]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pt-0 pb-4">{children}</div>
  </BaseAccordion.Panel>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
