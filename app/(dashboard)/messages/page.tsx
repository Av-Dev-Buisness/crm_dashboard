"use client"

import { useMessages } from "@/hooks/use-crm-data"
import { useClients } from "@/hooks/use-crm-data"
import { MessageFormWrapper } from "@/components/messages/message-form-wrapper"
import { DeleteMessageButton } from "@/components/messages/delete-message-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"

export default function MessagesPage() {
  const { messages, loading } = useMessages()
  const { clients } = useClients()

  const getClientName = (clientId?: string) => {
    if (!clientId) return "—"
    const client = clients.find((c) => c.id === clientId)
    return client?.name || "—"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading messages...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Messages</h1>
          <p className="mt-2 text-lg text-gray-600">View and manage your message logs</p>
        </div>
        <MessageFormWrapper />
      </div>

      <div className="rounded-xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No messages found. Create your first message to get started.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{getClientName(message.client_id)}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2">{message.message}</p>
                  </TableCell>
                  <TableCell>{formatDate(message.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <MessageFormWrapper message={message} variant="icon" />
                      <DeleteMessageButton messageId={message.id} />
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
