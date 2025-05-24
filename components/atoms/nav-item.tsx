"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/lib/navigation"

interface NavItemComponentProps {
  item: NavItem
  collapsed?: boolean
}

export function NavItemComponent({ item, collapsed = false }: NavItemComponentProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={collapsed ? item.title : undefined}
        className={cn(
          "transition-colors duration-200",
          isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800",
        )}
      >
        <Link href={item.href}>
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
