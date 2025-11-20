"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageForm } from "./message-form"
import * as storage from "@/lib/storage"
import { Plus, Pencil } from "lucide-react"

interface MessageFormWrapperProps {
  message?: storage.Message | null
  variant?: "default" | "icon"
}

export function MessageFormWrapper({
  message,
  variant = "default",
}: MessageFormWrapperProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (data: { client_id?: string; message: string }) => {
    if (message) {
      storage.updateMessage(message.id, data)
    } else {
      storage.createMessage(data)
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
        <MessageForm
          message={message}
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
        Add Message
      </Button>
      <MessageForm
        message={message}
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  )
}

