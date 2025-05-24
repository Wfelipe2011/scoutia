import Image from "next/image"
import { LoginContainer } from "@/components/organisms/login-container"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Área do formulário - sempre visível */}
      <div className="flex items-center justify-center p-6 lg:p-8">
        <LoginContainer />
      </div>

      {/* Área da imagem - apenas no desktop */}
      <div className="hidden lg:block relative bg-slate-900">
        <Image
          src="/placeholder.svg?height=1080&width=1920&query=modern office workspace with clean design"
          alt="Workspace moderno e limpo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/20" />
        <div className="absolute bottom-8 left-8 right-8">
          <blockquote className="text-white">
            <p className="text-lg font-medium">
              "O Scoutia transformou completamente nossa forma de trabalhar. A interface intuitiva e as funcionalidades
              poderosas nos ajudam a ser mais produtivos todos os dias."
            </p>
            <footer className="mt-4">
              <p className="text-sm text-slate-300">— Maria Silva, Gerente de Projetos</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
