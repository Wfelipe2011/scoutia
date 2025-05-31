import type React from "react"
import { LayoutDashboard, QrCode, Users, Coins } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

export const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Visão geral da plataforma",
  },
  {
    title: "Capturar QR Code WhatsApp",
    href: "/whatsapp",
    icon: QrCode,
    description: "Capture leads via WhatsApp",
  }
]
