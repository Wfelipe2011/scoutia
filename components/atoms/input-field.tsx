"use client"

import type React from "react"
import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, error, className, id, ...props }, ref) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
      </Label>
      <Input
        ref={ref}
        id={inputId}
        className={cn(
          "h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-500",
          "focus:border-blue-500 focus:ring-blue-500",
          "transition-colors duration-200",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

InputField.displayName = "InputField"

export { InputField }
