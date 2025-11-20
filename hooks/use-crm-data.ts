"use client"

import { useState, useEffect, useCallback } from "react"
import * as storage from "@/lib/storage"

export function useClients() {
  const [clients, setClients] = useState<storage.Client[]>([])
  const [loading, setLoading] = useState(true)

  const loadClients = useCallback(() => {
    setLoading(true)
    const data = storage.getClients()
    setClients(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const createClient = useCallback(
    (data: Omit<storage.Client, "id" | "created_at">) => {
      storage.createClient(data)
      loadClients()
    },
    [loadClients]
  )

  const updateClient = useCallback(
    (id: string, data: Partial<storage.Client>) => {
      storage.updateClient(id, data)
      loadClients()
    },
    [loadClients]
  )

  const deleteClient = useCallback(
    (id: string) => {
      storage.deleteClient(id)
      loadClients()
    },
    [loadClients]
  )

  return { clients, loading, createClient, updateClient, deleteClient, refresh: loadClients }
}

export function useLeads() {
  const [leads, setLeads] = useState<storage.Lead[]>([])
  const [loading, setLoading] = useState(true)

  const loadLeads = useCallback(() => {
    setLoading(true)
    const data = storage.getLeads()
    setLeads(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadLeads()
  }, [loadLeads])

  const createLead = useCallback(
    (data: Omit<storage.Lead, "id" | "created_at">) => {
      storage.createLead(data)
      loadLeads()
    },
    [loadLeads]
  )

  const updateLead = useCallback(
    (id: string, data: Partial<storage.Lead>) => {
      storage.updateLead(id, data)
      loadLeads()
    },
    [loadLeads]
  )

  const deleteLead = useCallback(
    (id: string) => {
      storage.deleteLead(id)
      loadLeads()
    },
    [loadLeads]
  )

  return { leads, loading, createLead, updateLead, deleteLead, refresh: loadLeads }
}

export function useTasks() {
  const [tasks, setTasks] = useState<storage.Task[]>([])
  const [loading, setLoading] = useState(true)

  const loadTasks = useCallback(() => {
    setLoading(true)
    const data = storage.getTasks()
    setTasks(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const createTask = useCallback(
    (data: Omit<storage.Task, "id" | "created_at">) => {
      storage.createTask(data)
      loadTasks()
    },
    [loadTasks]
  )

  const updateTask = useCallback(
    (id: string, data: Partial<storage.Task>) => {
      storage.updateTask(id, data)
      loadTasks()
    },
    [loadTasks]
  )

  const deleteTask = useCallback(
    (id: string) => {
      storage.deleteTask(id)
      loadTasks()
    },
    [loadTasks]
  )

  return { tasks, loading, createTask, updateTask, deleteTask, refresh: loadTasks }
}

export function useMessages(clientId?: string) {
  const [messages, setMessages] = useState<storage.Message[]>([])
  const [loading, setLoading] = useState(true)

  const loadMessages = useCallback(() => {
    setLoading(true)
    const data = storage.getMessages(clientId)
    setMessages(data)
    setLoading(false)
  }, [clientId])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const createMessage = useCallback(
    (data: Omit<storage.Message, "id" | "created_at">) => {
      storage.createMessage(data)
      loadMessages()
    },
    [loadMessages]
  )

  const updateMessage = useCallback(
    (id: string, data: Partial<storage.Message>) => {
      storage.updateMessage(id, data)
      loadMessages()
    },
    [loadMessages]
  )

  const deleteMessage = useCallback(
    (id: string) => {
      storage.deleteMessage(id)
      loadMessages()
    },
    [loadMessages]
  )

  return {
    messages,
    loading,
    createMessage,
    updateMessage,
    deleteMessage,
    refresh: loadMessages,
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<storage.Project[]>([])
  const [loading, setLoading] = useState(true)

  const loadProjects = useCallback(() => {
    setLoading(true)
    const data = storage.getProjects()
    setProjects(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const createProject = useCallback(
    (data: Omit<storage.Project, "id" | "created_at">) => {
      storage.createProject(data)
      loadProjects()
    },
    [loadProjects]
  )

  const updateProject = useCallback(
    (id: string, data: Partial<storage.Project>) => {
      storage.updateProject(id, data)
      loadProjects()
    },
    [loadProjects]
  )

  const deleteProject = useCallback(
    (id: string) => {
      storage.deleteProject(id)
      loadProjects()
    },
    [loadProjects]
  )

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refresh: loadProjects,
  }
}

export function useStats() {
  const [stats, setStats] = useState(storage.getDashboardStats())

  const refresh = useCallback(() => {
    setStats(storage.getDashboardStats())
  }, [])

  return { stats, refresh }
}

