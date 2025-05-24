import { Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface CoinBalanceProps {
  amount: number
  className?: string
  showTooltip?: boolean
  tooltipContent?: string
  size?: "sm" | "md" | "lg"
}

export function CoinBalance({
  amount,
  className,
  showTooltip = true,
  tooltipContent = "Saldo disponível para compra de leads",
  size = "md",
}: CoinBalanceProps) {
  // Formatação do número com separador de milhares
  const formattedAmount = new Intl.NumberFormat("pt-BR").format(amount)

  // Classes baseadas no tamanho
  const sizeClasses = {
    sm: {
      card: "p-2",
      icon: "h-4 w-4",
      amount: "text-base",
      label: "text-xs",
    },
    md: {
      card: "p-3",
      icon: "h-5 w-5",
      amount: "text-lg",
      label: "text-sm",
    },
    lg: {
      card: "p-4",
      icon: "h-6 w-6",
      amount: "text-xl",
      label: "text-sm",
    },
  }

  const coinBalance = (
    <Card className={cn("bg-white", sizeClasses[size].card, className)}>
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-blue-50 p-1.5">
              <Coins className={cn("text-blue-600", sizeClasses[size].icon)} />
            </div>
            <span className={cn("font-medium text-slate-900", sizeClasses[size].amount)}>{formattedAmount} Coins</span>
          </div>
          <span className={cn("mt-1 text-slate-500", sizeClasses[size].label)}>Saldo disponível</span>
        </div>
      </CardContent>
    </Card>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{coinBalance}</TooltipTrigger>
          <TooltipContent className="bg-slate-800 text-white border-slate-700" side="bottom">
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return coinBalance
}
