"use client"

import { useState } from "react"
import { Filter, Download, ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster } from "@/components/ui/toaster"
import { LeadsTable } from "@/components/organisms/leads-table"
import { leadsData } from "@/lib/data"
import { useCoins } from "@/contexts/coins-context"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function LeadsPage() {
  const { spendCoins } = useCoins()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Filtra os leads com base no termo de busca e categoria
  const filteredLeads = leadsData.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || lead.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Extrai categorias únicas para o filtro
  const uniqueCategories = Array.from(new Set(leadsData.map((lead) => lead.category)))

  // Função para desbloquear um lead
  const handleUnlockLead = (id: string): boolean => {
    // Usa o contexto para gastar coins
    return spendCoins(1)
  }

  // Componente de filtros para desktop
  const DesktopFilters = () => (
    <div className="hidden md:flex gap-4">
      <div className="relative flex-1">
        <Input
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
        <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Todas as categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {uniqueCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" className="bg-white">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  )

  // Componente de filtros para mobile (em um Sheet)
  const MobileFilters = () => (
    <div className="flex md:hidden gap-2">
      <div className="relative flex-1">
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
        <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-white">
            <ListFilter className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>Filtre os leads por categoria</SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Categoria</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-4">
              <Download className="mr-2 h-4 w-4" />
              Exportar Leads
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Adquirir Leads</h1>
        <p className="text-slate-600">Visualize e adquira leads qualificados para seu negócio</p>
      </div>

      <DesktopFilters />
      <MobileFilters />

      <LeadsTable leads={filteredLeads} onUnlockLead={handleUnlockLead} />

      <Toaster />
    </div>
  )
}
