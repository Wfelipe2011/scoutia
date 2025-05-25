import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: Request) {
  try {
    const METABASE_SITE_URL = "https://metabase.wfelipe.com.br";
    const METABASE_SECRET_KEY = "ef138f71db9d16b055eb1c3d1c230c342229017ca857125976f2b68bf0179469";

    // Verificar se as variáveis de ambiente estão definidas
    if (!METABASE_SITE_URL || !METABASE_SECRET_KEY) {
      return NextResponse.json({ error: "Configuração do Metabase incompleta" }, { status: 500 })
    }

    const payload = {
      resource: { dashboard: 34 },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60, // expira em 10 minutos
    }

    const token = jwt.sign(payload, METABASE_SECRET_KEY)
    const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`

    return NextResponse.json({ iframeUrl })
  } catch (error) {
    console.error("Erro ao gerar URL do Metabase:", error)
    return NextResponse.json({ error: "Falha ao gerar URL do dashboard" }, { status: 500 })
  }
}
