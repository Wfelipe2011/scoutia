"use client"

import { useState } from "react"
import { Eye, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { CategoryBadge } from "@/components/atoms/category-badge"
import { HiddenData } from "@/components/atoms/hidden-data"
import type { Lead } from "@/lib/types"
import { cn } from "@/lib/utils"

interface LeadRowProps {
  lead: Lead
  isUnlocked: boolean
  onUnlock: (id: string) => void
  className?: string
}

export function LeadRow({ lead, isUnlocked, onUnlock, className }: LeadRowProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TableRow
      className={cn("transition-colors duration-200", isHovered && !isUnlocked && "bg-blue-50", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableCell>
        <CategoryBadge category={lead.category} />
      </TableCell>
      <TableCell className="font-medium">{lead.name}</TableCell>
      <TableCell>
        <HiddenData isRevealed={isUnlocked} data={lead.phone} />
      </TableCell>
      <TableCell>
        <HiddenData isRevealed={isUnlocked} data={lead.website} />
      </TableCell>
      <TableCell className="text-right">
        {isUnlocked ? (
          <Button variant="outline" size="sm" className="text-green-600" disabled>
            <Check className="mr-1 h-4 w-4" />
            Desbloqueado
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
            onClick={() => onUnlock(lead.id)}
          >
            <Eye className="mr-1 h-4 w-4" />
            Visualizar Lead
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
