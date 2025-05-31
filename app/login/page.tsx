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
          src="https://media.brightdata.com/2024/05/business_web_scraper_api-1.svg"
          alt="Workspace moderno e limpo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/20" />
        <div className="absolute bottom-8 left-8 right-8">
         
        </div>
      </div>
    </div>
  )
}
