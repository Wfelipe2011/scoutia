"use client"

import { useState } from "react"
import { CoinBalanceCard } from "@/components/molecules/coin-balance-card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CoinBalanceCardDemo() {
  const [balance, setBalance] = useState(1250)

  const handleAddCoins = () => {
    setBalance((prev) => prev + 100)
    toast({
      title: "Coins adicionados",
      description: "100 coins foram adicionados ao seu saldo.",
    })
  }

  const handleViewHistory = () => {
    toast({
      title: "Histórico de transações",
      description: "Esta funcionalidade estaria conectada a uma página de histórico real.",
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Componente CoinBalanceCard</h1>
          <p className="text-slate-600">Demonstração do componente CoinBalanceCard em diferentes contextos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Versão completa</h2>
            <CoinBalanceCard
              amount={balance}
              onAddCoins={handleAddCoins}
              onViewHistory={handleViewHistory}
              monthlyUsage={{
                used: 750,
                total: 2000,
              }}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Versão simplificada</h2>
            <CoinBalanceCard amount={balance} showAddButton={false} showHistory={false} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Saldo baixo</h2>
            <CoinBalanceCard
              amount={50}
              className="border-yellow-200 bg-yellow-50"
              monthlyUsage={{
                used: 950,
                total: 1000,
              }}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Sem saldo</h2>
            <CoinBalanceCard
              amount={0}
              className="border-red-200 bg-red-50"
              monthlyUsage={{
                used: 1000,
                total: 1000,
              }}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-slate-800">Saldo alto</h2>
            <CoinBalanceCard
              amount={9999}
              className="border-green-200 bg-green-50"
              monthlyUsage={{
                used: 1000,
                total: 10000,
              }}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
