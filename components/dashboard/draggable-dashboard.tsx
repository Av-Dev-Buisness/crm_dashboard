"use client"

import { useState, useEffect, useRef } from "react"
import GridLayout, { Layout } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { getDashboardPreferences, saveDashboardLayouts, getDefaultLayouts, resetDashboardLayouts } from "@/lib/dashboard-preferences"
import { Widget } from "./widget"
import { QuickStats } from "./quick-stats"
import { RecentActivity } from "./recent-activity"
import { Users, TrendingUp, CheckSquare, FolderKanban, DollarSign, Activity } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useLeads, useTasks } from "@/hooks/use-crm-data"

interface DraggableDashboardProps {
  stats: {
    clients: number
    leads: number
    tasks: number
    activeTasks: number
    projects: number
    totalValue: number
  }
}

// Required widget keys
const REQUIRED_WIDGETS = ["quickStats", "clients", "leads", "tasks", "projects", "value", "recentActivity", "performanceSummary"]

function validateLayout(layout: Layout[]): boolean {
  if (!layout || layout.length === 0) return false
  const layoutKeys = layout.map((item) => item.i)
  return REQUIRED_WIDGETS.every((key) => layoutKeys.includes(key))
}

export function DraggableDashboard({ stats }: DraggableDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const defaultLayouts = getDefaultLayouts()
  
  // Initialize layouts with validation
  const [layouts, setLayouts] = useState<{ lg: Layout[]; md: Layout[]; sm: Layout[] }>(() => {
    const prefs = getDashboardPreferences()
    const lgLayout = (prefs.layouts?.lg || defaultLayouts.lg) as Layout[]
    const mdLayout = (prefs.layouts?.md || defaultLayouts.md) as Layout[]
    const smLayout = (prefs.layouts?.sm || defaultLayouts.sm) as Layout[]
    
    // Check if layouts are valid - if not, reset to defaults
    const lgValid = validateLayout(lgLayout)
    const mdValid = validateLayout(mdLayout)
    const smValid = validateLayout(smLayout)
    
    // Also check if all items have x > 0 (if everything is at x=0, it's corrupted)
    const checkXPositions = (layout: Layout[]) => {
      if (!layout || layout.length === 0) return false
      // At least some items should have x > 0
      const hasNonZeroX = layout.some(item => item.x > 0)
      return hasNonZeroX
    }
    
    if (!lgValid || !mdValid || !smValid || 
        !checkXPositions(lgLayout) || !checkXPositions(mdLayout) || !checkXPositions(smLayout)) {
      // Clear corrupted layout and use defaults
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("crm_dashboard_layouts")
        } catch {}
      }
      return defaultLayouts
    }
    
    return {
      lg: lgLayout,
      md: mdLayout,
      sm: smLayout,
    }
  })
  
  const [mounted, setMounted] = useState(false)
  // Start with a reasonable default width (max-w-7xl = 1280px minus padding)
  const [containerWidth, setContainerWidth] = useState(() => {
    if (typeof window !== "undefined") {
      // Calculate based on viewport, but cap at max-w-7xl (1280px)
      const maxWidth = 1280
      const padding = 48 // p-6 = 24px * 2
      return Math.min(window.innerWidth - padding, maxWidth)
    }
    return 1280
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateWidth = () => {
      if (containerRef.current) {
        // Use offsetWidth for more reliable measurement
        const width = containerRef.current.offsetWidth
        if (width > 0 && width !== containerWidth) {
          setContainerWidth(width)
        }
      }
    }

    // Multiple attempts to ensure we get the width
    const timers = [
      setTimeout(updateWidth, 0),
      setTimeout(updateWidth, 50),
      setTimeout(updateWidth, 100),
      setTimeout(updateWidth, 200),
    ]

    // Use ResizeObserver for accurate width tracking
    let resizeObserver: ResizeObserver | null = null
    if (containerRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width
          if (width > 0 && width !== containerWidth) {
            setContainerWidth(width)
          }
        }
      })
      resizeObserver.observe(containerRef.current)
    }

    // Also listen to window resize
    window.addEventListener("resize", updateWidth)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      window.removeEventListener("resize", updateWidth)
    }
  }, [mounted, containerWidth])

  const handleLayoutChange = (currentLayout: Layout[]) => {
    // Determine breakpoint based on current width
    const breakpoint = containerWidth >= 996 ? "lg" : containerWidth >= 768 ? "md" : "sm"
    
    // Update the layout for the current breakpoint
    const newLayouts = {
      ...layouts,
      [breakpoint]: currentLayout,
    }
    
    setLayouts(newLayouts)
    saveDashboardLayouts(newLayouts)
  }

  const statCards = [
    {
      id: "clients",
      title: "Total Clients",
      value: stats.clients,
      description: "Active clients in your CRM",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "leads",
      title: "Leads",
      value: stats.leads,
      description: "Total leads tracked",
      icon: TrendingUp,
      gradient: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10",
    },
    {
      id: "tasks",
      title: "Active Tasks",
      value: stats.activeTasks,
      description: `${stats.tasks} total tasks`,
      icon: CheckSquare,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      id: "projects",
      title: "Projects",
      value: stats.projects,
      description: "Active projects",
      icon: FolderKanban,
      gradient: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      id: "value",
      title: "Total Value",
      value: formatCurrency(stats.totalValue),
      description: "Value from won leads",
      icon: DollarSign,
      gradient: "from-sky-500 to-cyan-500",
      bgColor: "bg-sky-500/10",
    },
  ]

  if (!mounted || containerWidth <= 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  // Determine which breakpoint to use
  const breakpoint = containerWidth >= 996 ? "lg" : containerWidth >= 768 ? "md" : "sm"
  const currentLayout = layouts[breakpoint]
  
  // Ensure we have a valid layout
  if (!currentLayout || currentLayout.length === 0) {
    // If layout is invalid, reset to defaults
    const defaultLayouts = getDefaultLayouts()
    setLayouts(defaultLayouts)
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Initializing dashboard layout...</div>
      </div>
    )
  }
  
  // Use container width
  const displayWidth = containerWidth

  // Ensure minimum width
  const safeWidth = Math.max(displayWidth, 800)

  return (
    <div 
      ref={containerRef} 
      className="w-full" 
      style={{ 
        minHeight: '600px',
        width: '100%',
      }}
    >
      <GridLayout
        className="layout"
        layout={currentLayout}
        onLayoutChange={handleLayoutChange}
        cols={12}
        rowHeight={60}
        width={safeWidth}
        isDraggable={true}
        isResizable={true}
        draggableHandle=".drag-handle"
        compactType={null}
        preventCollision={false}
        margin={[16, 16]}
        useCSSTransforms={true}
        containerPadding={[0, 0]}
        key={`grid-${safeWidth}-${breakpoint}`}
      >
        {/* Quick Stats */}
        <div key="quickStats">
          <div className="h-full drag-handle w-full overflow-hidden">
            <QuickStats />
          </div>
        </div>

        {/* Stat Cards */}
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.id}>
              <div className="h-full drag-handle w-full overflow-hidden">
                <Widget
                  title={card.title}
                  description={card.description}
                  icon={Icon}
                  gradient={card.gradient}
                  bgColor={card.bgColor}
                >
                  <div className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    {card.value}
                  </div>
                </Widget>
              </div>
            </div>
          )
        })}

        {/* Recent Activity */}
        <div key="recentActivity">
          <div className="h-full drag-handle w-full overflow-hidden">
            <Widget
              title="Recent Activity"
              description="Latest updates across your CRM"
              icon={Activity}
              gradient="from-indigo-500 to-purple-500"
              bgColor="bg-indigo-500/10"
            >
              <RecentActivity />
            </Widget>
          </div>
        </div>

        {/* Performance Summary */}
        <div key="performanceSummary">
          <div className="h-full drag-handle w-full overflow-hidden">
            <Widget
              title="Performance Summary"
              description="Key metrics at a glance"
              icon={TrendingUp}
              gradient="from-emerald-500 to-teal-500"
              bgColor="bg-emerald-500/10"
            >
              <PerformanceSummary stats={stats} />
            </Widget>
          </div>
        </div>
      </GridLayout>
    </div>
  )
}

function PerformanceSummary({ stats }: { stats: DraggableDashboardProps["stats"] }) {
  const { leads } = useLeads()
  const { tasks } = useTasks()
  
  const wonLeads = leads.filter((l) => l.status === "won").length
  const avgLeadValue = stats.leads > 0 ? stats.totalValue / stats.leads : 0
  const completionRate = stats.tasks > 0 ? Math.round((stats.tasks - stats.activeTasks) / stats.tasks * 100) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white/50 p-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Average Lead Value</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(avgLeadValue)}</p>
        </div>
        <DollarSign className="h-8 w-8 text-emerald-600" />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white/50 p-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Tasks Completion Rate</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{completionRate}%</p>
        </div>
        <CheckSquare className="h-8 w-8 text-blue-600" />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white/50 p-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Active Projects</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{stats.projects}</p>
        </div>
        <FolderKanban className="h-8 w-8 text-indigo-600" />
      </div>
    </div>
  )
}
