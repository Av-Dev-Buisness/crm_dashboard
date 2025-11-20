# CRM Dashboard Setup Guide (localStorage Version)

This guide will help you set up and run the CRM Dashboard application using localStorage.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Create Your First Account

1. Navigate to the signup page
2. Enter any email and password (minimum 6 characters)
3. You'll be automatically redirected to the dashboard

**Note**: Authentication is simplified - any email/password combination works. The credentials are stored in localStorage.

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

## Data Storage

All data is stored in your browser's localStorage:

- **crm_clients** - All client records
- **crm_leads** - All lead records
- **crm_tasks** - All task records
- **crm_messages** - All message records
- **crm_projects** - All project records
- **crm_user** - Current user session

### Important Notes

⚠️ **Data Persistence**: 
- Data is stored locally in your browser
- Data persists across page refreshes
- Data is NOT synced across devices or browsers
- Clearing browser data will delete all stored information
- Using incognito/private mode will not persist data after closing

### Viewing Stored Data

You can view your stored data in the browser console:
```javascript
// View all clients
JSON.parse(localStorage.getItem('crm_clients'))

// View all leads
JSON.parse(localStorage.getItem('crm_leads'))

// Clear all data (use with caution!)
localStorage.clear()
```

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

## Troubleshooting

### Data Not Persisting
- Ensure localStorage is enabled in your browser
- Check browser console for errors
- Verify you're not in incognito/private mode

### Authentication Issues
- Clear browser localStorage and try again
- Check browser console for errors
- Ensure cookies/localStorage are enabled

### Build Errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear browser cache

## Exporting Data

To export your data, run this in the browser console:

```javascript
const data = {
  clients: JSON.parse(localStorage.getItem('crm_clients') || '[]'),
  leads: JSON.parse(localStorage.getItem('crm_leads') || '[]'),
  tasks: JSON.parse(localStorage.getItem('crm_tasks') || '[]'),
  messages: JSON.parse(localStorage.getItem('crm_messages') || '[]'),
  projects: JSON.parse(localStorage.getItem('crm_projects') || '[]'),
}
console.log(JSON.stringify(data, null, 2))
// Copy the output and save to a file
```

## Importing Data

To import data, run this in the browser console (replace with your data):

```javascript
const data = { /* your data object */ }
localStorage.setItem('crm_clients', JSON.stringify(data.clients))
localStorage.setItem('crm_leads', JSON.stringify(data.leads))
localStorage.setItem('crm_tasks', JSON.stringify(data.tasks))
localStorage.setItem('crm_messages', JSON.stringify(data.messages))
localStorage.setItem('crm_projects', JSON.stringify(data.projects))
// Refresh the page
```

## Next Steps

- Customize the UI theme in `tailwind.config.ts`
- Add additional fields to data models as needed
- Implement additional features like search and filtering
- Add data export/import functionality
- Consider migrating to a backend if you need multi-device sync
