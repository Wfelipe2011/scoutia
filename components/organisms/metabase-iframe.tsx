import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type DecodedToken = {
  tenantId: string
}

async function getIframeUrl() {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get("token")?.value

    if (!token) throw new Error("Token não encontrado nos cookies")

    const decoded = jwtDecode<DecodedToken>(token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/metabase?tenantId=${decoded.tenantId}`)

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    if (!data.iframeUrl) {
      throw new Error("iframeUrl não veio na resposta")
    }

    return { iframeUrl: data.iframeUrl, error: null }
  } catch (err: any) {
    console.error("Erro ao buscar iframe:", err)
    return { iframeUrl: null, error: err.message }
  }
}

export default async function MetabaseIframeServer() {
  const { iframeUrl, error } = await getIframeUrl()

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar dashboard</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
      <div className="relative">
        <iframe
          id="metabase-iframe"
          src={iframeUrl!}
          frameBorder={0}
          width="100%"
          height="1600"
          title="Metabase Dashboard"
        />
        <div
          className="
            absolute
            left-0
            right-0
            bottom-0
            h-20
            bg-white
            z-10
            pointer-events-none
          "
        />
      </div>
    </div>
  )
}
