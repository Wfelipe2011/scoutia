"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, CreditCard, Zap } from "lucide-react"
import { useCoins } from "@/contexts/coins-context"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CreditosPage() {
  const { addCoins } = useCoins()
  const { toast } = useToast()

  const creditPackages = [
    {
      id: 1,
      coins: 100,
      price: "R$ 50,00",
      bonus: null,
    },
    {
      id: 2,
      coins: 250,
      price: "R$ 100,00",
      bonus: "+25 coins de bônus",
      totalCoins: 275,
    },
    {
      id: 3,
      coins: 500,
      price: "R$ 180,00",
      bonus: "+100 coins de bônus",
      totalCoins: 600,
    },
    {
      id: 4,
      coins: 1000,
      price: "R$ 350,00",
      bonus: "+250 coins de bônus",
      totalCoins: 1250,
    },
  ]

  const handlePurchase = (pkg: (typeof creditPackages)[0]) => {
    const coinsToAdd = pkg.totalCoins || pkg.coins
    addCoins(coinsToAdd)

    toast({
      title: "Compra realizada com sucesso!",
      description: `${coinsToAdd} coins foram adicionados à sua conta.`,
      variant: "default",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Comprar Créditos</h2>
        <p className="text-slate-600">Recarregue sua conta com Coins para adquirir leads</p>
      </div>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Zap className="h-5 w-5" />
            Oferta Especial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-700">
            Compre acima de 250 coins e ganhe bônus extras! Quanto mais você compra, mais você ganha.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {creditPackages.map((pkg) => (
          <Card key={pkg.id} className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-blue-600" />
                {pkg.coins} Coins
              </CardTitle>
              {pkg.bonus && <CardDescription className="text-green-600 font-medium">{pkg.bonus}</CardDescription>}
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900">{pkg.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handlePurchase(pkg)}>
                <CreditCard className="mr-2 h-4 w-4" />
                Comprar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Toaster />
    </div>
  )
}
