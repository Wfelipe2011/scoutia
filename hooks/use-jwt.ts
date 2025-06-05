import { jwtDecode } from "jwt-decode"

export const useJwt = () => {
  const decodedToken = (token: string) => {
    return jwtDecode(token)
  }

  return {
    decodedToken,
  }
}
