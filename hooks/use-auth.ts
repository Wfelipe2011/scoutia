"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface LoginCredentials {
  email: string
  password: string
}

interface AuthState {
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    error: null,
  })

  const login = async (credentials: LoginCredentials) => {
    setState({ isLoading: true, error: null })

    try {
      // Simula delay de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simula validação de credenciais
      if (credentials.email === "wfelipe2011@gmail.com" && credentials.password === "123456") {
        // Login bem-sucedido
        router.push("/dashboard")
      } else {
        // Login falhou
        setState({
          isLoading: false,
          error: "Email ou senha incorretos. Tente novamente.",
        })
      }
    } catch (error) {
      setState({
        isLoading: false,
        error: "Ocorreu um erro ao fazer login. Tente novamente.",
      })
    }
  }

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }))
  }

  return {
    login,
    clearError,
    isLoading: state.isLoading,
    error: state.error,
  }
}
