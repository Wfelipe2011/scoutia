export interface DecodedToken {
  tenantId: string
  userId: string
  email: string
  name: string
  exp: number
  iat: number
}
