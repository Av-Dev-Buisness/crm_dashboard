"use client"

import { useProjects } from "@/hooks/use-crm-data"
import { useClients } from "@/hooks/use-crm-data"
import { ProjectFormWrapper } from "@/components/projects/project-form-wrapper"
import { DeleteProjectButton } from "@/components/projects/delete-project-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatCurrency } from "@/lib/utils"

export default function ProjectsPage() {
  const { projects, loading } = useProjects()
  const { clients } = useClients()

  const getClientName = (clientId?: string) => {
    if (!clientId) return "—"
    const client = clients.find((c) => c.id === clientId)
    return client?.name || "—"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Projects</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your projects and budgets</p>
        </div>
        <ProjectFormWrapper />
      </div>

      <div className="rounded-xl border border-gray-300 bg-white/80 shadow-lg backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No projects found. Create your first project to get started.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{getClientName(project.client_id)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {project.budget ? formatCurrency(project.budget) : "—"}
                  </TableCell>
                  <TableCell>{formatDate(project.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ProjectFormWrapper project={project} variant="icon" />
                      <DeleteProjectButton projectId={project.id} />
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
