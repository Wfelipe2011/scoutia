import MetabaseIframe  from "@/components/organisms/metabase-iframe"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="rounded-lg overflow-hidden shadow-md relative">
        <MetabaseIframe />
      </div>
    </div>
  )
}
