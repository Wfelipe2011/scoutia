"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InputField } from "../atoms/input-field"
import { PasswordField } from "../atoms/password-field"
import { useLoginForm } from "@/hooks/use-login-form"
import { useEffect } from "react"

export function LoginForm() {
  const {
    formData,
    showPassword,
    isLoading,
    logout,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLoginForm()

  useEffect(() => logout(), [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-4">
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
          disabled={isLoading}
        />

        <PasswordField
          label="Senha"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleInputChange}
          showPassword={showPassword}
          onTogglePassword={togglePasswordVisibility}
          required
          autoComplete="current-password"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Entrando...
            </span>
          ) : (
            "Entrar"
          )}
        </Button>

        {/* <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
          >
            Esqueci minha senha
          </Link>
        </div> */}
      </div>
    </form>
  )
}
