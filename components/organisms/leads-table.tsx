"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LeadRow } from "@/components/molecules/lead-row"
import { LeadCard } from "@/components/molecules/lead-card"
import type { Lead } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"

interface LeadsTableProps {
  leads: Lead[]
  onUnlockLead: (id: string) => boolean
}

export function LeadsTable({ leads, onUnlockLead }: LeadsTableProps) {
  const [unlockedLeads, setUnlockedLeads] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleUnlockLead = (id: string) => {
    // Tenta desbloquear o lead (função passada pelo componente pai)
    const success = onUnlockLead(id)

    if (success) {
      // Adiciona o ID à lista de leads desbloqueados
      setUnlockedLeads((prev) => new Set([...prev, id]))

      toast({
        title: "Lead desbloqueado com sucesso!",
        description: "Agora você pode visualizar os dados completos deste lead.",
        variant: "default",
      })
    } else {
      toast({
        title: "Erro ao desbloquear lead",
        description: "Você não possui créditos suficientes para esta operação.",
        variant: "destructive",
      })
    }
  }

  // Renderização para desktop (tabela)
  if (isDesktop) {
    return (
      <div className="rounded-md border border-slate-200 bg-white">
        <Table>
          <TableCaption>Lista de leads disponíveis para aquisição.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Categoria</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} isUnlocked={unlockedLeads.has(lead.id)} onUnlock={handleUnlockLead} />
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // Renderização para mobile (cards)
  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} isUnlocked={unlockedLeads.has(lead.id)} onUnlock={handleUnlockLead} />
      ))}
    </div>
  )
}
