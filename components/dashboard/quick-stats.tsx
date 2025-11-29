"use client"

import { useStats } from "@/hooks/use-crm-data"
import { useLeads, useTasks } from "@/hooks/use-crm-data"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, CheckCircle2, Clock } from "lucide-react"

export function QuickStats() {
  const { stats } = useStats()
  const { leads } = useLeads()
  const { tasks } = useTasks()

  const wonLeads = leads.filter((l) => l.status === "won").length
  const conversionRate = leads.length > 0 ? ((wonLeads / leads.length) * 100).toFixed(1) : "0"
  const overdueTasks = tasks.filter(
    (t) => t.due_date && new Date(t.due_date) < new Date() && t.status !== "done"
  ).length
  const completionRate =
    tasks.length > 0 ? ((tasks.filter((t) => t.status === "done").length / tasks.length) * 100).toFixed(1) : "0"

  const quickStats = [
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Task Completion",
      value: `${completionRate}%`,
      change: "+12%",
      trend: "up",
      icon: CheckCircle2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Overdue Tasks",
      value: overdueTasks.toString(),
      change: overdueTasks > 0 ? "Needs attention" : "All good",
      trend: overdueTasks > 0 ? "down" : "up",
      icon: Clock,
      color: overdueTasks > 0 ? "text-red-600" : "text-green-600",
      bgColor: overdueTasks > 0 ? "bg-red-50" : "bg-green-50",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3 h-full">
      {quickStats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-300 bg-white/50 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`rounded-lg ${stat.bgColor} p-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

