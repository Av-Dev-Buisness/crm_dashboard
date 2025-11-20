"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProjectForm } from "./project-form"
import * as storage from "@/lib/storage"
import { Plus, Pencil } from "lucide-react"

interface ProjectFormWrapperProps {
  project?: storage.Project | null
  variant?: "default" | "icon"
}

export function ProjectFormWrapper({ project, variant = "default" }: ProjectFormWrapperProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (data: {
    client_id?: string
    name: string
    description?: string
    status: "planning" | "active" | "on_hold" | "completed"
    budget?: number
  }) => {
    if (project) {
      storage.updateProject(project.id, data)
    } else {
      storage.createProject(data)
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
        <ProjectForm
          project={project}
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
        Add Project
      </Button>
      <ProjectForm
        project={project}
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  )
}

