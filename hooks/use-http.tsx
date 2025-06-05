"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export const useHttp = () => {
  const [token, setToken] = useState("")
  const navigate = useRouter()

  useEffect(() => {
    const token = Cookies.get("userToken")

    if (token) {
      setToken(token)
    }
  }, [Cookies.get("userToken")])

  // Atualizar a formatação da URL para usar a nova base de API
  const formatInput = (input: string | URL | globalThis.Request) => {
    if (typeof input === "string") {
      const inputStartsWith = input.startsWith("/")
      input = `${process.env.NEXT_PUBLIC_API_URL}${!inputStartsWith ? "/" : ""}${input}`
    } else if (input instanceof URL) {
      const url = new URL(input)
      input = `${process.env.NEXT_PUBLIC_API_URL}${url.pathname}`
    } else {
      input = `${process.env.NEXT_PUBLIC_API_URL}${input.url}`
    }
    return input
  }

  const request = (input: string | URL | globalThis.Request, init?: RequestInit) => {
    if (!token && !Cookies.get("userToken")) {
      navigate.push("/login")
      return Promise.reject(new Error("Token not found"))
    }
    input = formatInput(input)

    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token || Cookies.get("userToken")}`,
      },
    })
  }

  const rawRequest = (input: string | URL | globalThis.Request, init?: RequestInit) => {
    input = formatInput(input)
    return fetch(input, init)
  }

  return {
    request,
    rawRequest,
    alreadyLogged: !!token,
  }
}
