"use client"

import { Button } from "@/components/ui/button"
import { InputField } from "../atoms/input-field"
import { PasswordField } from "../atoms/password-field"
import { useLoginForm } from "@/hooks/use-login-form"

export function LoginForm() {
  const { formData, showPassword, handleInputChange, handleSubmit, togglePasswordVisibility } = useLoginForm()

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
        />
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Entrar
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
