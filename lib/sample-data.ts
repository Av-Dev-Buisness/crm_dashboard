import type { Client, Lead, Task, Message, Project } from "./storage"

export function initializeSampleData() {
  // Check if data already exists
  if (typeof window === "undefined") return
  
  const existingClients = localStorage.getItem("crm_clients")
  if (existingClients && JSON.parse(existingClients).length > 0) {
    return // Data already exists, don't overwrite
  }

  const sampleClients: Client[] = [
    {
      id: "1",
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567",
      notes: "Large enterprise client. Interested in enterprise solutions. Decision maker: John Smith.",
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      name: "TechStart Inc",
      email: "hello@techstart.io",
      phone: "+1 (555) 234-5678",
      notes: "Fast-growing startup. Budget-conscious but high potential. Contact: Sarah Johnson.",
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      name: "Global Solutions Ltd",
      email: "info@globalsolutions.com",
      phone: "+1 (555) 345-6789",
      notes: "International company. Multiple decision makers. Long sales cycle expected.",
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      name: "Digital Marketing Pro",
      email: "team@digitalmarketingpro.com",
      phone: "+1 (555) 456-7890",
      notes: "Marketing agency. Needs custom solutions. Very responsive to emails.",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      name: "Innovation Labs",
      email: "contact@innovationlabs.com",
      phone: "+1 (555) 567-8901",
      notes: "Research and development company. Interested in cutting-edge features.",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const sampleLeads: Lead[] = [
    {
      id: "1",
      client_id: "1",
      status: "qualified",
      source: "Website",
      value: 50000,
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      client_id: "2",
      status: "contacted",
      source: "Referral",
      value: 15000,
      created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      client_id: "3",
      status: "new",
      source: "LinkedIn",
      value: 75000,
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      client_id: "4",
      status: "won",
      source: "Email Campaign",
      value: 25000,
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      client_id: "5",
      status: "contacted",
      source: "Trade Show",
      value: 35000,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "6",
      client_id: undefined,
      status: "new",
      source: "Website",
      value: 10000,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const sampleTasks: Task[] = [
    {
      id: "1",
      client_id: "1",
      title: "Follow up on proposal",
      description: "Send follow-up email regarding enterprise proposal. Include pricing details.",
      status: "pending",
      due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      client_id: "2",
      title: "Schedule demo call",
      description: "Set up product demonstration for TechStart team. Focus on scalability features.",
      status: "in_progress",
      due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      client_id: "3",
      title: "Prepare contract documents",
      description: "Draft initial contract for Global Solutions. Review legal requirements.",
      status: "pending",
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      client_id: "4",
      title: "Onboarding call completed",
      description: "Successfully completed onboarding process with Digital Marketing Pro.",
      status: "done",
      due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      client_id: "5",
      title: "Technical requirements review",
      description: "Review technical specifications with Innovation Labs team.",
      status: "in_progress",
      due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "6",
      client_id: undefined,
      title: "Update marketing materials",
      description: "Refresh product brochures and case studies.",
      status: "pending",
      due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const sampleProjects: Project[] = [
    {
      id: "1",
      client_id: "1",
      name: "Enterprise Implementation",
      description: "Full-scale enterprise solution deployment for Acme Corporation.",
      status: "active",
      budget: 50000,
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      client_id: "2",
      name: "Startup Package Setup",
      description: "Custom package configuration for TechStart Inc.",
      status: "planning",
      budget: 15000,
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      client_id: "4",
      name: "Marketing Agency Integration",
      description: "Integration project for Digital Marketing Pro.",
      status: "completed",
      budget: 25000,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      client_id: "5",
      name: "R&D Feature Development",
      description: "Custom feature development for Innovation Labs.",
      status: "active",
      budget: 35000,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      client_id: "3",
      name: "Global Rollout Planning",
      description: "Planning phase for international deployment.",
      status: "on_hold",
      budget: 75000,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const sampleMessages: Message[] = [
    {
      id: "1",
      client_id: "1",
      message: "Initial contact made. Client expressed interest in enterprise solutions. Scheduled follow-up call for next week.",
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      client_id: "1",
      message: "Follow-up call completed. Discussed pricing and implementation timeline. Client requested detailed proposal.",
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      client_id: "2",
      message: "Met with Sarah Johnson at TechStart. They're looking for scalable solutions. Very interested in our startup package.",
      created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      client_id: "4",
      message: "Onboarding completed successfully! Digital Marketing Pro is now live on the platform. Team is very happy with the setup.",
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      client_id: "5",
      message: "Technical requirements meeting scheduled. Innovation Labs wants to discuss custom features for their R&D projects.",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "6",
      client_id: "3",
      message: "Initial contact with Global Solutions. They have multiple decision makers. Will need to coordinate with their team.",
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "7",
      message: "General note: Need to update all client portfolios with latest case studies and testimonials.",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  // Store sample data
  localStorage.setItem("crm_clients", JSON.stringify(sampleClients))
  localStorage.setItem("crm_leads", JSON.stringify(sampleLeads))
  localStorage.setItem("crm_tasks", JSON.stringify(sampleTasks))
  localStorage.setItem("crm_projects", JSON.stringify(sampleProjects))
  localStorage.setItem("crm_messages", JSON.stringify(sampleMessages))
}

