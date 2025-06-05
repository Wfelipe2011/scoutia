"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useJwt } from "@/hooks/use-jwt"
import { useHttp } from "@/hooks/use-http"
import { io } from "socket.io-client"
import { parseCookies } from 'nookies'

interface QRCodeResponse {
  qrCode: string
  status: "pending" | "success" | "error" | "connected"
  message?: string
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useWhatsappSocket = () => {
  const [qrCode, setQrCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [status, setStatus] = useState<Pick<QRCodeResponse, "status">["status"]>("pending")
  const { decodedToken } = useJwt()
  const http = useHttp()
  const router = useRouter()
  const cookies = parseCookies()
  const token = cookies.token
  
  
  // Atualizar a URL do socket.io para a nova base de API
  useEffect(() => {
    const userData = decodedToken(token) as { userId: number }
    // console.log("Iniciando conexão SSE...")
    const url = process.env.NEXT_PUBLIC_API_WHATSAPP_URL
    const socket = io(`${url}`, {})

    socket.on("connect", () => {
      console.log("conectado familia: ", socket.id)

      socket.emit("subscribeToQrCode", String(userData.userId))
      socket.on("qrCode", (data: QRCodeResponse) => {
        console.log("data: ", data)

        if (data.qrCode) {
          const formattedQR = data.qrCode
          setQrCode(formattedQR)
        }

        setStatus(data.status)

        if (data.status === "success") {
          setIsLoading(false)
        } else if (data.status === "error") {
          setIsLoading(false)
          socket.close()
        } else if (data.status === "connected") {
          setIsLoading(false)
          socket.close()
          setQrCode("")
        }
      })

      socket.on("connect_error", (error) => {
        console.log("error: ", error)
      })
      socket.on("disconnect", () => {
        console.log(socket.id) // undefined
      })
      // Escuta por erros
      socket.on("error", (error) => {
        console.error("Erro no WebSocket:", error)
      })
    })

    return () => {
      socket.close()
    }
  }, [])

  const disconnectWhatsAppSession = useCallback(async () => {
    try {
      const response = await http.request("/whatsapp/session/logout", {
        method: "POST",
      })
      if (!response.ok) {
        throw new Error("Falha ao desconectar a sessão do WhatsApp")
      }

      alert("Sua sessão do WhatsApp foi desconectada com sucesso.")

      await sleep(2000)

      router.push("/")
    } catch (error) {
      console.error("Erro ao desconectar a sessão do WhatsApp:", error)
      alert("Falha ao desconectar a sessão do WhatsApp")
    }
  }, [])

  return {
    qrCode,
    isLoading,
    status,
    disconnectWhatsAppSession,
  }
}
