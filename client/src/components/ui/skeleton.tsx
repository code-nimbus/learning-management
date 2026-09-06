import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-primary/10 bg-gray-700", className)}
      {...props}
    />
  )
}

export { Skeleton }
