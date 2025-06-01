"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuthLogic } from "@/hooks/use-auth"

export interface User {
  token: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const authData = useAuthLogic()

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
