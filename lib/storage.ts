// LocalStorage utilities for CRM data persistence

export type Client = {
  id: string
  name: string
  email?: string
  phone?: string
  notes?: string
  created_at: string
}

export type Lead = {
  id: string
  client_id?: string
  status: "new" | "contacted" | "qualified" | "lost" | "won"
  source?: string
  value?: number
  created_at: string
}

export type Task = {
  id: string
  client_id?: string
  title: string
  description?: string
  status: "pending" | "in_progress" | "done"
  due_date?: string
  created_at: string
}

export type Message = {
  id: string
  client_id?: string
  message: string
  created_at: string
}

export type Project = {
  id: string
  client_id?: string
  name: string
  description?: string
  status: "planning" | "active" | "on_hold" | "completed"
  budget?: number
  created_at: string
}

const STORAGE_KEYS = {
  CLIENTS: "crm_clients",
  LEADS: "crm_leads",
  TASKS: "crm_tasks",
  MESSAGES: "crm_messages",
  PROJECTS: "crm_projects",
  USER: "crm_user",
} as const

// Generic storage helpers
function getStorageItem<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : []
  } catch {
    return []
  }
}

function setStorageItem<T>(key: string, value: T[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

// Clients
export function getClients(): Client[] {
  return getStorageItem<Client>(STORAGE_KEYS.CLIENTS)
}

export function getClient(id: string): Client | null {
  const clients = getClients()
  return clients.find((c) => c.id === id) || null
}

export function createClient(client: Omit<Client, "id" | "created_at">): Client {
  const clients = getClients()
  const newClient: Client = {
    ...client,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  setStorageItem(STORAGE_KEYS.CLIENTS, [...clients, newClient])
  return newClient
}

export function updateClient(id: string, updates: Partial<Client>): Client {
  const clients = getClients()
  const index = clients.findIndex((c) => c.id === id)
  if (index === -1) throw new Error("Client not found")
  const updated = { ...clients[index], ...updates }
  clients[index] = updated
  setStorageItem(STORAGE_KEYS.CLIENTS, clients)
  return updated
}

export function deleteClient(id: string): void {
  const clients = getClients()
  setStorageItem(
    STORAGE_KEYS.CLIENTS,
    clients.filter((c) => c.id !== id)
  )
}

// Leads
export function getLeads(): Lead[] {
  return getStorageItem<Lead>(STORAGE_KEYS.LEADS)
}

export function createLead(lead: Omit<Lead, "id" | "created_at">): Lead {
  const leads = getLeads()
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  setStorageItem(STORAGE_KEYS.LEADS, [...leads, newLead])
  return newLead
}

export function updateLead(id: string, updates: Partial<Lead>): Lead {
  const leads = getLeads()
  const index = leads.findIndex((l) => l.id === id)
  if (index === -1) throw new Error("Lead not found")
  const updated = { ...leads[index], ...updates }
  leads[index] = updated
  setStorageItem(STORAGE_KEYS.LEADS, leads)
  return updated
}

export function deleteLead(id: string): void {
  const leads = getLeads()
  setStorageItem(
    STORAGE_KEYS.LEADS,
    leads.filter((l) => l.id !== id)
  )
}

// Tasks
export function getTasks(): Task[] {
  return getStorageItem<Task>(STORAGE_KEYS.TASKS)
}

export function createTask(task: Omit<Task, "id" | "created_at">): Task {
  const tasks = getTasks()
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  setStorageItem(STORAGE_KEYS.TASKS, [...tasks, newTask])
  return newTask
}

export function updateTask(id: string, updates: Partial<Task>): Task {
  const tasks = getTasks()
  const index = tasks.findIndex((t) => t.id === id)
  if (index === -1) throw new Error("Task not found")
  const updated = { ...tasks[index], ...updates }
  tasks[index] = updated
  setStorageItem(STORAGE_KEYS.TASKS, tasks)
  return updated
}

export function deleteTask(id: string): void {
  const tasks = getTasks()
  setStorageItem(
    STORAGE_KEYS.TASKS,
    tasks.filter((t) => t.id !== id)
  )
}

// Messages
export function getMessages(clientId?: string): Message[] {
  const messages = getStorageItem<Message>(STORAGE_KEYS.MESSAGES)
  if (clientId) {
    return messages.filter((m) => m.client_id === clientId)
  }
  return messages
}

export function createMessage(message: Omit<Message, "id" | "created_at">): Message {
  const messages = getMessages()
  const newMessage: Message = {
    ...message,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  setStorageItem(STORAGE_KEYS.MESSAGES, [...messages, newMessage])
  return newMessage
}

export function updateMessage(id: string, updates: Partial<Message>): Message {
  const messages = getMessages()
  const index = messages.findIndex((m) => m.id === id)
  if (index === -1) throw new Error("Message not found")
  const updated = { ...messages[index], ...updates }
  messages[index] = updated
  setStorageItem(STORAGE_KEYS.MESSAGES, messages)
  return updated
}

export function deleteMessage(id: string): void {
  const messages = getMessages()
  setStorageItem(
    STORAGE_KEYS.MESSAGES,
    messages.filter((m) => m.id !== id)
  )
}

// Projects
export function getProjects(): Project[] {
  return getStorageItem<Project>(STORAGE_KEYS.PROJECTS)
}

export function createProject(project: Omit<Project, "id" | "created_at">): Project {
  const projects = getProjects()
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }
  setStorageItem(STORAGE_KEYS.PROJECTS, [...projects, newProject])
  return newProject
}

export function updateProject(id: string, updates: Partial<Project>): Project {
  const projects = getProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) throw new Error("Project not found")
  const updated = { ...projects[index], ...updates }
  projects[index] = updated
  setStorageItem(STORAGE_KEYS.PROJECTS, projects)
  return updated
}

export function deleteProject(id: string): void {
  const projects = getProjects()
  setStorageItem(
    STORAGE_KEYS.PROJECTS,
    projects.filter((p) => p.id !== id)
  )
}

// Auth (simple localStorage-based)
export type User = {
  email: string
  name?: string
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export function clearCurrentUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.USER)
}

// Stats helper
export function getDashboardStats() {
  const clients = getClients()
  const leads = getLeads()
  const tasks = getTasks()
  const projects = getProjects()

  const activeTasks = tasks.filter((t) =>
    ["pending", "in_progress"].includes(t.status)
  ).length

  const wonLeads = leads.filter((l) => l.status === "won")
  const totalValue = wonLeads.reduce((sum, lead) => sum + (lead.value || 0), 0)

  return {
    clients: clients.length,
    leads: leads.length,
    tasks: tasks.length,
    activeTasks,
    projects: projects.length,
    totalValue,
  }
}

