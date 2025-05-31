"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useState, type ChangeEvent, type FormEvent } from "react"

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

export function useLoginForm() {
  const { login, logout, loading } = useAuth()

  const [formData, setFormData] = useState<FormData>({
    email: "wfelipe2011@gmail.com",
    password: "123456",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.email) {
      errors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido"
    }

    if (!formData.password) {
      errors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      errors.password = "Senha deve ter pelo menos 6 caracteres"
    }
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await login(formData.email, formData.password)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return {
    formData,
    showPassword,
    logout,
    isLoading: loading,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  }
}
