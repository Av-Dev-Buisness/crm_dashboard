"use client"

import { useEffect, useState } from "react"
import * as storage from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [clientId, setClientId] = useState<string>("")
  const [client, setClient] = useState<storage.Client | null>(null)
  const [leads, setLeads] = useState<storage.Lead[]>([])
  const [tasks, setTasks] = useState<storage.Task[]>([])
  const [projects, setProjects] = useState<storage.Project[]>([])
  const [messages, setMessages] = useState<storage.Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then((p) => setClientId(p.id))
  }, [params])

  useEffect(() => {
    if (!clientId) return

    const loadData = () => {
      const foundClient = storage.getClient(clientId)
      if (!foundClient) {
        router.push("/clients")
        return
      }

      setClient(foundClient)
      setLeads(storage.getLeads().filter((lead) => lead.client_id === clientId))
      setTasks(storage.getTasks().filter((task) => task.client_id === clientId))
      setProjects(storage.getProjects().filter((project) => project.client_id === clientId))
      setMessages(storage.getMessages(clientId))
      setLoading(false)
    }

    loadData()
    // Refresh data periodically
    const interval = setInterval(loadData, 1000)
    return () => clearInterval(interval)
  }, [clientId, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading client details...</div>
      </div>
    )
  }

  if (!client) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gradient">{client.name}</h1>
        <p className="mt-2 text-lg text-gray-600">Client details and related information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Email:</span>
              <p>{client.email || "—"}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Phone:</span>
              <p>{client.phone || "—"}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Created:</span>
              <p>{formatDate(client.created_at)}</p>
            </div>
            {client.notes && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">Notes:</span>
                <p className="mt-1 whitespace-pre-wrap">{client.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Leads:</span>
              <span className="font-medium">{leads.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tasks:</span>
              <span className="font-medium">{tasks.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projects:</span>
              <span className="font-medium">{projects.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Messages:</span>
              <span className="font-medium">{messages.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {leads.length > 0 && (
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Leads</CardTitle>
            <CardDescription>Leads associated with this client</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Badge variant="outline">{lead.status}</Badge>
                    </TableCell>
                    <TableCell>{lead.source || "—"}</TableCell>
                    <TableCell>{lead.value ? formatCurrency(lead.value) : "—"}</TableCell>
                    <TableCell>{formatDate(lead.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {tasks.length > 0 && (
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Tasks</CardTitle>
            <CardDescription>Tasks associated with this client</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{task.status}</Badge>
                    </TableCell>
                    <TableCell>{task.due_date ? formatDate(task.due_date) : "—"}</TableCell>
                    <TableCell>{formatDate(task.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {projects.length > 0 && (
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Projects</CardTitle>
            <CardDescription>Projects associated with this client</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {project.budget ? formatCurrency(project.budget) : "—"}
                    </TableCell>
                    <TableCell>{formatDate(project.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {messages.length > 0 && (
        <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Messages</CardTitle>
            <CardDescription>Message history with this client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="border-b pb-4 last:border-0">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(message.created_at)}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap">{message.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
