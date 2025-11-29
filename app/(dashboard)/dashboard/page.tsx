"use client"

import { useStats } from "@/hooks/use-crm-data"
import { DraggableDashboard } from "@/components/dashboard/draggable-dashboard"
import { CustomizeButton } from "@/components/dashboard/customize-button"
import { useEffect, useState } from "react"
import { GripVertical } from "lucide-react"

export default function DashboardPage() {
  const { stats, refresh } = useStats()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    refresh()
    setMounted(true)
  }, [refresh])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">Dashboard</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-gray-600">
            Welcome back! Drag widgets to rearrange, resize by dragging corners.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">
            <GripVertical className="h-4 w-4" />
            <span>Drag to rearrange</span>
          </div>
          <CustomizeButton />
        </div>
      </div>

      {/* Draggable Dashboard */}
      <div className="min-h-[400px] sm:min-h-[600px] w-full">
        <DraggableDashboard stats={stats} />
      </div>
    </div>
  )
}
