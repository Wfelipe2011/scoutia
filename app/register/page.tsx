import Link from "next/link"
import { Logo } from "@/components/atoms/logo"
import { Button } from "@/components/ui/button"
import { InputField } from "@/components/atoms/input-field"
import { PasswordField } from "@/components/atoms/password-field"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Logo />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Criar conta</h1>
            <p className="text-slate-600">Preencha os dados para começar</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <InputField label="Nome completo" name="name" type="text" placeholder="João Silva" required />
            <InputField label="Email" name="email" type="email" placeholder="seu@email.com" required />
            <PasswordField label="Senha" name="password" placeholder="Crie uma senha forte" required />
            <PasswordField
              label="Confirmar senha"
              name="confirmPassword"
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
            Criar conta
          </Button>

          <div className="text-center text-sm">
            <span className="text-slate-600">Já tem uma conta? </span>
            <Link href="/login" className="text-blue-600 hover:text-blue-700 hover:underline">
              Fazer login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
