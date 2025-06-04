"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/organisms/app-sidebar"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Lista de rotas que não devem ter sidebar
  const noSidebarRoutes = ["/login", "/register", "/forgot-password"]
  const shouldShowSidebar = !noSidebarRoutes.includes(pathname)

  if (!shouldShowSidebar) {
    return <>{children}</>
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
            <SidebarTrigger className="-ml-2" />

            <div className="flex flex-1 items-center justify-between gap-4">
              <h1 className="text-lg font-semibold text-slate-900 hidden sm:block">Scoutia Platform</h1>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-slate-50">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
