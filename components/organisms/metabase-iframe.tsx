"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { parseCookies } from "nookies"
import { jwtDecode } from "jwt-decode"
import { DecodedToken } from "@/types/auth"

export function MetabaseIframe() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cookies = parseCookies();
  const token = cookies.token;
  const decoded = jwtDecode<DecodedToken>(token);

  const fetchDashboardUrl = async () => {
    try {

      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/metabase?tenantId=${decoded.tenantId}`)

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.iframeUrl) {
        throw new Error("URL do iframe não encontrada na resposta")
      }

      setIframeUrl(data.iframeUrl)
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error)
      setError(
        "Não foi possível carregar o dashboard. Verifique se as variáveis de ambiente estão configuradas corretamente.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardUrl()
  }, [])

  // Função para lidar com o carregamento do iframe
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleRetry = () => {
    fetchDashboardUrl()
  }

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
      {isLoading && (
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      )}

      {error && (
        <div className="p-6">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao carregar dashboard</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <Button onClick={handleRetry} className="mt-2">
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      )}

      {iframeUrl && !error && (
        <div className="relative">
          <iframe
            id="metabase-iframe"
            src={iframeUrl}
            frameBorder={0}
            width="100%"
            height="2400"
            style={{ display: isLoading ? "none" : "block" }}
            onLoad={handleIframeLoad}
            allowTransparency
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
      )}
    </div>
  )
}
