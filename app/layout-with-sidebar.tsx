import type React from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/organisms/app-sidebar"
import { AuthProvider } from "@/contexts/AuthContext"

export default function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
              <SidebarTrigger className="-ml-2" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-slate-900">Scoutia Platform</h1>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-slate-50 p-6">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthProvider>
  )
}
