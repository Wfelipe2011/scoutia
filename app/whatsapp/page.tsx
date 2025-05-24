import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Smartphone, CheckCircle } from "lucide-react"

export default function WhatsAppPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Capturar QR Code WhatsApp</h2>
        <p className="text-slate-600">Configure a captura de leads através do WhatsApp</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-green-600" />
              Gerar QR Code
            </CardTitle>
            <CardDescription>Crie um QR Code para capturar leads via WhatsApp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8">
              <QrCode className="h-32 w-32 text-slate-400" />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <QrCode className="mr-2 h-4 w-4" />
              Gerar Novo QR Code
            </Button>
          </CardContent>
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
