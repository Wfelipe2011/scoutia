import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CategoryBadgeProps {
  category: string
  className?: string
}

// Mapeamento de categorias para cores
const categoryColors: Record<string, string> = {
  "E-commerce": "bg-blue-100 text-blue-800 hover:bg-blue-100",
  Saúde: "bg-green-100 text-green-800 hover:bg-green-100",
  Educação: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  Alimentação: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Tecnologia: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  Moda: "bg-pink-100 text-pink-800 hover:bg-pink-100",
  Imobiliária: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  Automotivo: "bg-red-100 text-red-800 hover:bg-red-100",
  Fitness: "bg-teal-100 text-teal-800 hover:bg-teal-100",
  Beleza: "bg-rose-100 text-rose-800 hover:bg-rose-100",
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  // Obter a cor da categoria ou usar um padrão
  const colorClass = categoryColors[category] || "bg-slate-100 text-slate-800 hover:bg-slate-100"

  return (
    <Badge variant="outline" className={cn("font-medium border-0", colorClass, className)}>
      {category}
    </Badge>
  )
}
