"use client"

import type React from "react"
import { forwardRef } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string
  error?: string
  showPassword?: boolean
  onTogglePassword?: () => void
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, showPassword = false, onTogglePassword, className, id, ...props }, ref) => {
    const inputId = id || "password"

    return (
      <div className="space-y-2">
        <Label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            className={cn(
              "h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 pr-11",
              "focus:border-blue-500 focus:ring-blue-500",
              "transition-colors duration-200",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className,
            )}
            {...props}
          />
          {onTogglePassword && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
              onClick={onTogglePassword}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-slate-500" />
              ) : (
                <Eye className="h-4 w-4 text-slate-500" />
              )}
            </Button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

PasswordField.displayName = "PasswordField"

export { PasswordField }
