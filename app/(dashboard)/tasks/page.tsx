"use client"

import { useTasks } from "@/hooks/use-crm-data"
import { useClients } from "@/hooks/use-crm-data"
import { TaskFormWrapper } from "@/components/tasks/task-form-wrapper"
import { DeleteTaskButton } from "@/components/tasks/delete-task-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export default function TasksPage() {
  const { tasks, loading } = useTasks()
  const { clients } = useClients()

  const getClientName = (clientId?: string) => {
    if (!clientId) return "—"
    const client = clients.find((c) => c.id === clientId)
    return client?.name || "—"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">Tasks</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-gray-600">Manage your tasks and to-dos</p>
        </div>
        <TaskFormWrapper />
      </div>

      <div className="rounded-xl border border-gray-300 bg-white/80 shadow-lg backdrop-blur-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No tasks found. Create your first task to get started.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{getClientName(task.client_id)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.status}</Badge>
                  </TableCell>
                  <TableCell>{task.due_date ? formatDate(task.due_date) : "—"}</TableCell>
                  <TableCell>{formatDate(task.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TaskFormWrapper task={task} variant="icon" />
                      <DeleteTaskButton taskId={task.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
