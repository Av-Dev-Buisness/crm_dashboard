"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LeadForm } from "./lead-form"
import * as storage from "@/lib/storage"
import { Plus, Pencil } from "lucide-react"

interface LeadFormWrapperProps {
  lead?: storage.Lead | null
  variant?: "default" | "icon"
}

export function LeadFormWrapper({ lead, variant = "default" }: LeadFormWrapperProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (data: {
    client_id?: string
    status: "new" | "contacted" | "qualified" | "lost" | "won"
    source?: string
    value?: number
  }) => {
    if (lead) {
      storage.updateLead(lead.id, data)
    } else {
      storage.createLead(data)
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
        <LeadForm
          lead={lead}
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
        Add Lead
      </Button>
      <LeadForm
        lead={lead}
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  )
}

