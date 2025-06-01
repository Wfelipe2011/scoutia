"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { parseCookies, destroyCookie } from "nookies"

export interface User {
  token: string
}

export function useAuthLogic() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const { token } = parseCookies()
      return token ? { token } : null
    }
    return null
  })

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [])

  const logout = () => {
    destroyCookie(null, "token")
    setUser(null) // Corrigido: era "nul" antes
      router.push("/login")
  }

  return {
    user,
    loading,
    logout,
  }
}
