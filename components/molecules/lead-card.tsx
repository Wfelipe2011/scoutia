"use client"

import { Eye, Check, ExternalLink, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CategoryBadge } from "@/components/atoms/category-badge"
import type { Lead } from "@/lib/types"

interface LeadCardProps {
  lead: Lead
  isUnlocked: boolean
  onUnlock: (id: string) => void
}

export function LeadCard({ lead, isUnlocked, onUnlock }: LeadCardProps) {
  return (
    <Card className="border-slate-200 overflow-hidden">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-slate-900 mb-1">{lead.name}</h3>
            <CategoryBadge category={lead.category} />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-400" />
            {isUnlocked ? (
              <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                {lead.phone}
              </a>
            ) : (
              <div className="flex items-center text-slate-400">
                <span>•••••••</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-slate-400" />
            {isUnlocked ? (
              <a
                href={`https://${lead.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {lead.website}
              </a>
            ) : (
              <div className="flex items-center text-slate-400">
                <span>•••••••</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-50 px-4 py-3 border-t border-slate-100">
        {isUnlocked ? (
          <Button variant="outline" size="sm" className="text-green-600 w-full" disabled>
            <Check className="mr-1 h-4 w-4" />
            Desbloqueado
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 w-full"
            onClick={() => onUnlock(lead.id)}
          >
            <Eye className="mr-1 h-4 w-4" />
            Visualizar Lead
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
