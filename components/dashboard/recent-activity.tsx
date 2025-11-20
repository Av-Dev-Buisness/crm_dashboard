"use client"

import { useClients, useLeads, useTasks, useProjects, useMessages } from "@/hooks/use-crm-data"
import { formatDate } from "@/lib/utils"
import { Clock, User, TrendingUp, CheckSquare, FolderKanban, MessageSquare } from "lucide-react"
import Link from "next/link"

export function RecentActivity() {
  const { clients } = useClients()
  const { leads } = useLeads()
  const { tasks } = useTasks()
  const { projects } = useProjects()
  const { messages } = useMessages()

  // Combine all activities and sort by date
  const activities = [
    ...clients.slice(0, 3).map((c) => ({
      id: c.id,
      type: "client",
      title: `New client: ${c.name}`,
      date: c.created_at,
      icon: User,
      href: `/clients/${c.id}`,
      color: "text-blue-600",
    })),
    ...leads.slice(0, 2).map((l) => ({
      id: l.id,
      type: "lead",
      title: `Lead ${l.status}: ${l.value ? `$${l.value.toLocaleString()}` : "New lead"}`,
      date: l.created_at,
      icon: TrendingUp,
      href: "/leads",
      color: "text-teal-600",
    })),
    ...tasks.slice(0, 2).map((t) => ({
      id: t.id,
      type: "task",
      title: t.title,
      date: t.created_at,
      icon: CheckSquare,
      href: "/tasks",
      color: "text-emerald-600",
    })),
    ...projects.slice(0, 2).map((p) => ({
      id: p.id,
      type: "project",
      title: p.name,
      date: p.created_at,
      icon: FolderKanban,
      href: "/projects",
      color: "text-indigo-600",
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)

  return (
    <div className="space-y-3">
      {activities.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity</p>
      ) : (
        activities.map((activity) => {
          const Icon = activity.icon
          return (
            <Link
              key={`${activity.type}-${activity.id}`}
              href={activity.href}
              className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50/50"
            >
              <div className={`rounded-lg bg-blue-50 p-2 ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                </div>
              </div>
            </Link>
          )
        })
      )}
    </div>
  )
}

