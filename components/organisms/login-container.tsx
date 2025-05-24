import { Logo } from "../atoms/logo"
import { LoginForm } from "../molecules/login-form"

export function LoginContainer() {
  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center space-y-6">
        <Logo />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Bem-vindo de volta</h1>
          <p className="text-slate-600">Entre com suas credenciais para acessar sua conta</p>
        </div>
      </div>

      <LoginForm />
    </div>
  )
}
