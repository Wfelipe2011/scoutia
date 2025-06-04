import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  email: string
  userName: string
  roles: string[]
  tenantId: number
  exp: number
  iat: number
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login")

  console.log("Rota autenticada?", isAuthRoute)

  if (isAuthRoute) {
    console.log("Rota de login, limpando token e liberando acesso")

    // Se estiver na rota de login, limpar o token dos cookies
    const response = NextResponse.next()
    if (token) {
      response.cookies.delete("token")
      console.log("Token removido dos cookies na rota de login")
    }

    return response
  }

  if (!token) {
    console.log("Token não encontrado, redirecionando para login")
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token)

    const currentTime = Math.floor(Date.now() / 1000)

    if (decoded.exp && decoded.exp < currentTime) {
      console.log("Token expirado, redirecionando para login")
      const response = NextResponse.redirect(new URL("/login", req.url))
      response.cookies.delete("token")
      return response
    }

    console.log(`[middleware] Autenticado: ${decoded.userName} - Roles: ${decoded.roles}`)
    return NextResponse.next()
  } catch (error) {
    console.log("Token inválido:", error)
    const response = NextResponse.redirect(new URL("/login", req.url))
    response.cookies.delete("token")
    return response
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/whatsapp/:path*", "/login"],
}
