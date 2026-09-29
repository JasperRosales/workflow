import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse border-2 border-foreground/20 bg-muted",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
