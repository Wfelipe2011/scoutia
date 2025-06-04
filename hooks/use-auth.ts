"use client"

import { useRouter } from "next/navigation"
import { destroyCookie } from "nookies"

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    destroyCookie(null, "token")
    router.push("/login")
  }

  return { logout }
}
