"use client"

import { LogOut, User } from "lucide-react"
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { useLogout } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { parseCookies } from "nookies"
import { jwtDecode } from "jwt-decode"

export function AppSidebarFooter() {
  const [userName, setUserName] = useState<string>("")
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      try {
        const decoded: { userName: string } = jwtDecode(token)
        setUserName(decoded.userName || "Usuário")
      } catch (error) {
        console.error("Erro ao decodificar o token:", error)
        setUserName("Usuário")
      }
    } else {
      setUserName("Usuário")
    }

  }, [])

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{ userName }</span>
                  <span className="truncate text-xs text-slate-500">Scoutia Platform</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="top"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
