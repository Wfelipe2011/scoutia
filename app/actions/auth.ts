"use server"

import { redirect } from "next/navigation"

export async function authenticateUser(formData: FormData) {
  // Simula delay de autenticação
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  
  return redirect("/dashboard")
  

  return {
    success: false,
    message: "Email ou senha incorretos. Tente novamente.",
  }
}
