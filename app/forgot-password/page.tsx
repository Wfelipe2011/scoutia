import Link from "next/link"
import { Logo } from "@/components/atoms/logo"
import { Button } from "@/components/ui/button"
import { InputField } from "@/components/atoms/input-field"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Logo />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Recuperar senha</h1>
            <p className="text-slate-600">Digite seu email para receber as instruções</p>
          </div>
        </div>

        <form className="space-y-6">
          <InputField label="Email" name="email" type="email" placeholder="seu@email.com" required />

          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
            Enviar instruções
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
