"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ClientForm } from "./client-form"
import * as storage from "@/lib/storage"
import { Plus, Pencil } from "lucide-react"

interface ClientFormWrapperProps {
  client?: storage.Client | null
  variant?: "default" | "icon"
}

export function ClientFormWrapper({ client, variant = "default" }: ClientFormWrapperProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (data: {
    name: string
    email?: string
    phone?: string
    notes?: string
  }) => {
    if (client) {
      storage.updateClient(client.id, data)
    } else {
      storage.createClient(data)
    }
  }

  if (variant === "icon") {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <ClientForm
          client={client}
          open={open}
          onOpenChange={setOpen}
          onSubmit={handleSubmit}
        />
      </>
    )
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Client
      </Button>
      <ClientForm
        client={client}
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  )
}

