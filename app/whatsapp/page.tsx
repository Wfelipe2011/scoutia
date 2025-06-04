"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Smartphone, CheckCircle } from "lucide-react"
import { useWhatsappSocket } from "./useWhatsappSocket"
import Image from "next/image"

const ShowQRCode = ({ qrCode }: { qrCode: string }) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-green-600" />
          {/* <Image src={qrCode} alt="QR Code" width={100} height={100} /> */}
          Capturar QR Code
        </CardTitle>
        <CardDescription>Capture o QR Code para enviar mensagens para os leads via WhatsApp</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8">
          <Image src={qrCode} alt="QR Code" height={300} width={300} className="rounded-lg object-cover" />
        </div>
      </CardContent>
    </>
  )
}

const SuccessOnCapture = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          QR Code Capturado
        </CardTitle>
        <CardDescription>
          O QR Code foi capturado com sucesso. Agora você pode enviar mensagens para os leads via WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-semibold text-green-600">Conexão estabelecida com sucesso!</h3>
            <p className="text-sm text-slate-600">Seu WhatsApp está pronto para receber e enviar mensagens.</p>
          </div>
        </div>
      </CardContent>
    </>
  )
}

const HandleViews = () => {
  const { qrCode, isLoading, status } = useWhatsappSocket();
  switch (status) {
    case "pending":
      return (
        <ShowQRCode qrCode={qrCode} />
      )
    case "success":
      return (
        <SuccessOnCapture />
      )
    case "connected":
      return (
        <SuccessOnCapture />
      )
    default:
      return (
        <ShowQRCode qrCode={qrCode} />
      )
  }
}

export default function WhatsAppPage() {


  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Capturar QR Code WhatsApp</h2>
        <p className="text-slate-600">Configure a captura de leads através do WhatsApp</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200">
          <HandleViews />
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              Instruções de Uso
            </CardTitle>
            <CardDescription>Como capturar leads com o QR Code</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-sm text-slate-700">Gere um QR Code personalizado para sua campanha</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-sm text-slate-700">Compartilhe o QR Code em seus materiais de marketing</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-sm text-slate-700">Os leads escaneiam e iniciam uma conversa no WhatsApp</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-sm text-slate-700">Capture automaticamente os dados do contato</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
