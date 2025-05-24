"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface CoinsContextType {
  coins: number
  setCoins: React.Dispatch<React.SetStateAction<number>>
  spendCoins: (amount: number) => boolean
  addCoins: (amount: number) => void
}

const CoinsContext = createContext<CoinsContextType | undefined>(undefined)

export function CoinsProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(1250)

  const spendCoins = (amount: number): boolean => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount)
      return true
    }
    return false
  }

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount)
  }

  return <CoinsContext.Provider value={{ coins, setCoins, spendCoins, addCoins }}>{children}</CoinsContext.Provider>
}

export function useCoins() {
  const context = useContext(CoinsContext)
  if (context === undefined) {
    throw new Error("useCoins must be used within a CoinsProvider")
  }
  return context
}
