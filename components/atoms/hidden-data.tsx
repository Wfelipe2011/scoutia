import { LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface HiddenDataProps {
  isRevealed: boolean
  data: string
  className?: string
}

export function HiddenData({ isRevealed, data, className }: HiddenDataProps) {
  if (isRevealed) {
    return <span className={cn("text-slate-900", className)}>{data}</span>
  }

  return (
    <div className={cn("flex items-center text-slate-400", className)}>
      <LockIcon className="mr-1 h-3 w-3" />
      <span>•••••••</span>
    </div>
  )
}
