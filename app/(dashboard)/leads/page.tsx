"use client"

import { useLeads } from "@/hooks/use-crm-data"
import { useClients } from "@/hooks/use-crm-data"
import { LeadFormWrapper } from "@/components/leads/lead-form-wrapper"
import { DeleteLeadButton } from "@/components/leads/delete-lead-button"
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

export default function LeadsPage() {
  const { leads, loading } = useLeads()
  const { clients } = useClients()

  const getClientName = (clientId?: string) => {
    if (!clientId) return "—"
    const client = clients.find((c) => c.id === clientId)
    return client?.name || "—"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading leads...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Leads</h1>
          <p className="mt-2 text-lg text-gray-600">Track and manage your leads</p>
        </div>
        <LeadFormWrapper />
      </div>

      <div className="rounded-xl border border-gray-300 bg-white/80 shadow-lg backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No leads found. Create your first lead to get started.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{getClientName(lead.client_id)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.status}</Badge>
                  </TableCell>
                  <TableCell>{lead.source || "—"}</TableCell>
                  <TableCell>{lead.value ? formatCurrency(lead.value) : "—"}</TableCell>
                  <TableCell>{formatDate(lead.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <LeadFormWrapper lead={lead} variant="icon" />
                      <DeleteLeadButton leadId={lead.id} />
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
