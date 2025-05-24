"use client"

import { MetabaseIframe } from "@/components/organisms/metabase-iframe"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Visualize métricas e indicadores importantes</p>
      </div>

      <div className="rounded-lg overflow-hidden shadow-md relative">
        <MetabaseIframe />
      </div>
    </div>
  )
}
