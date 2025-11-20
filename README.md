# CRM Dashboard

A full-stack Client CRM Dashboard built with Next.js 14, TypeScript, TailwindCSS, and **localStorage** for data persistence.

## Features

- 🔐 Simple localStorage-based authentication
- 👥 Client management (CRUD)
- 📊 Leads tracking with status management
- ✅ Task management with due dates
- 💬 Message logging
- 📁 Project management with budgets
- 🎨 Modern UI with shadcn/ui components
- 💾 All data stored in browser localStorage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Sign Up/Login**: Create an account or sign in (credentials are stored in localStorage)
2. **Manage Clients**: Add, edit, and delete clients
3. **Track Leads**: Manage leads with status tracking
4. **Create Tasks**: Organize tasks with due dates and status
5. **Manage Projects**: Track projects with budgets and status
6. **Log Messages**: Keep notes and message history

## Data Storage

All data is stored in the browser's localStorage:
- `crm_clients` - Client data
- `crm_leads` - Lead data
- `crm_tasks` - Task data
- `crm_messages` - Message data
- `crm_projects` - Project data
- `crm_user` - Current user session

**Note**: Data is stored locally in your browser. Clearing browser data will remove all stored information.

## Project Structure

```
/app
  /(auth)          # Authentication pages (login, signup)
  /(dashboard)     # Protected dashboard pages
/components        # React components
  /clients         # Client-related components
  /leads           # Lead-related components
  /tasks           # Task-related components
  /projects        # Project-related components
  /messages        # Message-related components
  /layout          # Layout components (sidebar, topbar)
  /ui              # shadcn/ui components
/lib
  storage.ts       # localStorage utilities
/hooks
  use-crm-data.ts  # React hooks for data management
```

## Features

### Dashboard
- Overview statistics for clients, leads, tasks, and projects
- Total value from won leads

### Clients
- Full CRUD operations
- View client details with related leads, tasks, projects, and messages
- Client contact information management

### Leads
- Track leads with status management (new, contacted, qualified, lost, won)
- Associate leads with clients
- Track lead source and value

### Tasks
- Create and manage tasks
- Set due dates
- Track task status (pending, in_progress, done)
- Associate tasks with clients

### Projects
- Manage projects with budgets
- Track project status (planning, active, on_hold, completed)
- Associate projects with clients

### Messages
- Log messages and notes
- Associate messages with clients
- View message history

## Development

The application uses:
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **shadcn/ui** for UI components
- **localStorage** for data persistence

## Notes

- This is a client-side only application - no backend required
- Data persists in browser localStorage
- Data is not synced across devices
- Clearing browser data will remove all stored information
- Perfect for personal use or demos
