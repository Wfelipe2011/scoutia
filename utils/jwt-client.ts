// Função para codificar em base64url
function base64url(source: string): string {
  // Codifica para base64
  let encodedSource = btoa(source)

  // Converte base64 para base64url
  encodedSource = encodedSource.replace(/=+$/, "") // Remove padding equals
  encodedSource = encodedSource.replace(/\+/g, "-") // Converte '+' para '-'
  encodedSource = encodedSource.replace(/\//g, "_") // Converte '/' para '_'

  return encodedSource
}

// Função para criar uma assinatura HMAC SHA256
async function createHmacSignature(input: string, secret: string): Promise<string> {
  // Converte a chave secreta para ArrayBuffer
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)

  // Importa a chave para uso com a Web Crypto API
  const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: { name: "SHA-256" } }, false, [
    "sign",
  ])

  // Cria a assinatura
  const data = encoder.encode(input)
  const signature = await crypto.subtle.sign("HMAC", key, data)

  // Converte a assinatura para base64url
  const signatureBytes = new Uint8Array(signature)
  let binarySignature = ""
  for (let i = 0; i < signatureBytes.byteLength; i++) {
    binarySignature += String.fromCharCode(signatureBytes[i])
  }

  return base64url(binarySignature)
}

// Função principal para assinar um token JWT
export async function signJwt(payload: any, secret: string): Promise<string> {
  // Cria o cabeçalho JWT
  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  // Codifica o cabeçalho e o payload
  const encodedHeader = base64url(JSON.stringify(header))
  const encodedPayload = base64url(JSON.stringify(payload))

  // Cria a string para assinar
  const signatureInput = `${encodedHeader}.${encodedPayload}`

  // Gera a assinatura
  const signature = await createHmacSignature(signatureInput, secret)

  // Retorna o token JWT completo
  return `${signatureInput}.${signature}`
}
