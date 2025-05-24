"use client"

import { useState, useEffect } from "react"
import { signJwt } from "@/utils/jwt-client"

interface MetabaseEmbedProps {
  resourceType: "dashboard" | "question" | "chart"
  resourceId: number
  params?: Record<string, any>
  height?: string
  className?: string
}

export function MetabaseEmbed({
  resourceType,
  resourceId,
  params = {},
  height = "600px",
  className,
}: MetabaseEmbedProps) {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function generateEmbedUrl() {
      try {
        setIsLoading(true)

        // Chave secreta para assinar o token
        const METABASE_SECRET_KEY = "ef138f71db9d16b055eb1c3d1c230c342229017ca857125976f2b68bf0179469"

        // Calcula a data de expiração (10 minutos a partir de agora)
        const now = Math.floor(Date.now() / 1000)
        const exp = now + 10 * 60 // 10 minutos

        // Cria o payload do JWT
        const payload = {
          resource: { [resourceType]: resourceId },
          params: params,
          exp: exp,
        }

        // Gera o token JWT
        const token = await signJwt(payload, METABASE_SECRET_KEY)

        // Constrói a URL do embed
        const embedUrl = `http://metabase.wfelipe.com.br/embed/${resourceType}/${token}#bordered=true&titled=true`

        // Atualiza o estado com a URL
        setIframeUrl(embedUrl)
      } catch (error) {
        console.error("Erro ao gerar URL do embed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    generateEmbedUrl()
  }, [])

  // Função para lidar com o carregamento do iframe
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
     

     
        <iframe
          src={iframeUrl}
          frameBorder="0"
          width="100%"
          height={height}
          className={className}
          style={{ display: isLoading ? "none" : "block" }}
          onLoad={handleIframeLoad}
          title="Metabase Dashboard"
          allowTransparency
        />
     
    </div>
  )
}
