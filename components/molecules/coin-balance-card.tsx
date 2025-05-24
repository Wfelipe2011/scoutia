"use client"

import { Coins, PlusCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface CoinBalanceCardProps {
  amount: number
  className?: string
  showAddButton?: boolean
  showHistory?: boolean
  onAddCoins?: () => void
  onViewHistory?: () => void
  monthlyUsage?: {
    used: number
    total: number
  }
}

export function CoinBalanceCard({
  amount,
  className,
  showAddButton = true,
  showHistory = true,
  onAddCoins,
  onViewHistory,
  monthlyUsage,
}: CoinBalanceCardProps) {
  // Formatação do número com separador de milhares
  const formattedAmount = new Intl.NumberFormat("pt-BR").format(amount)

  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-slate-800">Saldo de Coins</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Coins className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{formattedAmount}</p>
            <p className="text-sm text-slate-500">Coins disponíveis</p>
          </div>
        </div>

        {monthlyUsage && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Uso mensal</span>
              <span className="font-medium text-slate-800">
                {monthlyUsage.used} / {monthlyUsage.total} Coins
              </span>
            </div>
            <Progress value={(monthlyUsage.used / monthlyUsage.total) * 100} className="h-2 bg-slate-100" />
          </div>
        )}
      </CardContent>

      {(showAddButton || showHistory) && (
        <CardFooter className="flex gap-2 pt-0">
          {showAddButton && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              onClick={onAddCoins}
            >
              <PlusCircle className="mr-1 h-4 w-4" />
              Adicionar
            </Button>
          )}

          {showHistory && (
            <Button variant="outline" size="sm" className="flex-1" onClick={onViewHistory}>
              <TrendingUp className="mr-1 h-4 w-4" />
              Histórico
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
