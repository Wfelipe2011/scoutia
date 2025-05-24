"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useAuth } from "./use-auth"

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

export function useLoginForm() {
  const { login, isLoading, error, clearError } = useAuth()

  const [formData, setFormData] = useState<FormData>({
    email: "wfelipe2011@gmail.com",
    password: "123456",
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpa erro do campo quando usuário começa a digitar
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Limpa erro geral quando usuário modifica qualquer campo
    if (error) {
      clearError()
    }
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

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await login(formData)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return {
    formData,
    formErrors,
    showPassword,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  }
}
