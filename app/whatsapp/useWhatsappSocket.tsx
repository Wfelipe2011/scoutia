"use client"

// import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
// import { useJwt } from "./useJwt"
import { useHttp } from "@/hooks/use-http"
import { io } from "socket.io-client"
// import { useToast } from "./use-toast"

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
//   const { decodedToken } = useJwt()
//   const { user } = useAuth()
  const http = useHttp()
//   const { toast } = useToast()
  const router = useRouter()

  // Atualizar a URL do socket.io para a nova base de API
  useEffect(() => {
    // if (!user) return
    // const userData = decodedToken(user.token) as { userId: number }
    const userData = { userId: 1 }
    console.log("Iniciando conexão SSE...")
    const url = process.env.NEXT_PUBLIC_API_URL
    const socket = io(`${url}`, {})

    socket.on("connect", () => {
      console.log("conectado familia: ", socket.id)

      socket.emit("subscribeToQrCode", String(userData.userId))
      socket.on("qrCode", (data: QRCodeResponse) => {
        console.log("data: ", data)

        if (data.qrCode) {
          const formattedQR = data.qrCode
          console.log("🚀 ~ useEffect ~ formattedQR:", formattedQR)
          setQrCode(formattedQR)
        }

        setStatus(data.status)

        if (data.status === "success") {
          setIsLoading(false)
        } else if (data.status === "error") {
          setIsLoading(false)
          socket.close()
          // alert(`Erro: ${data.message}`);
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
//   }, [user])
  }, [])

  const disconnectWhatsAppSession = useCallback(async () => {
    try {
      const response = await http.request("/whatsapp/session/logout", {
        method: "POST",
      })
      if (!response.ok) {
        throw new Error("Falha ao desconectar a sessão do WhatsApp")
      }

    //   toast({
    //     title: "Desconectado",
    //     description: "Sua sessão do WhatsApp foi desconectada com sucesso.",
    //   })
      alert("Sua sessão do WhatsApp foi desconectada com sucesso.")

      await sleep(2000)

      router.push("/")
    } catch (error) {
      console.error("Erro ao desconectar a sessão do WhatsApp:", error)
    //   toast({
    //     title: "Erro",
    //     description: "Falha ao desconectar a sessão do WhatsApp",
    //     variant: "destructive",
    //   })
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
