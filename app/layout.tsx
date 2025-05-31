import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ConditionalLayout } from "@/components/layouts/conditional-layout"
import { CoinsProvider } from "@/contexts/coins-context"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Scoutia - Plataforma de Leads",
  description: "Gerencie seus leads e campanhas de marketing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
         <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
         </AuthProvider>
      </body>
    </html>
  )
}
