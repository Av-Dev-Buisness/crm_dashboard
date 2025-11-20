"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, GripVertical } from "lucide-react"
import { ReactNode } from "react"

interface WidgetProps {
  title: string
  description?: string
  icon?: LucideIcon
  gradient: string
  bgColor: string
  children: ReactNode
  className?: string
}

export function Widget({
  title,
  description,
  icon: Icon,
  gradient,
  bgColor,
  children,
  className = "",
}: WidgetProps) {
  return (
    <Card
      className={`group h-full flex flex-col border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="drag-handle cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
            <GripVertical className="h-4 w-4" />
          </div>
          {Icon && (
            <div className={`rounded-lg ${bgColor} p-2 transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
              <Icon className={`h-5 w-5 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <CardTitle className="text-sm font-semibold text-gray-700 truncate">{title}</CardTitle>
            {description && (
              <CardDescription className="text-xs truncate">{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto min-h-0">{children}</CardContent>
    </Card>
  )
}

