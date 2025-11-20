// Dashboard customization preferences stored in localStorage

export interface DashboardLayout {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}

export interface DashboardPreferences {
  layouts: {
    lg: DashboardLayout[]
    md: DashboardLayout[]
    sm: DashboardLayout[]
  }
}

const STORAGE_KEY = "crm_dashboard_layouts"

export const DEFAULT_LAYOUTS: DashboardLayout[] = [
  // Quick Stats - top row, full width
  { i: "quickStats", x: 0, y: 0, w: 12, h: 3, minW: 4, minH: 2 },
  // Main stat cards - 5 cards in a row (2.4 columns each, but we'll use 2 columns with spacing)
  { i: "clients", x: 0, y: 3, w: 2, h: 4, minW: 2, minH: 3 },
  { i: "leads", x: 2, y: 3, w: 2, h: 4, minW: 2, minH: 3 },
  { i: "tasks", x: 4, y: 3, w: 2, h: 4, minW: 2, minH: 3 },
  { i: "projects", x: 6, y: 3, w: 2, h: 4, minW: 2, minH: 3 },
  { i: "value", x: 8, y: 3, w: 2, h: 4, minW: 2, minH: 3 },
  // Bottom widgets - side by side
  { i: "recentActivity", x: 0, y: 7, w: 6, h: 6, minW: 4, minH: 4 },
  { i: "performanceSummary", x: 6, y: 7, w: 6, h: 6, minW: 4, minH: 4 },
]

export function getDefaultLayouts(): DashboardPreferences["layouts"] {
  return {
    lg: DEFAULT_LAYOUTS,
    md: DEFAULT_LAYOUTS,
    sm: DEFAULT_LAYOUTS,
  }
}

export function getDashboardPreferences(): DashboardPreferences {
  const defaultLayouts = getDefaultLayouts()
  
  if (typeof window === "undefined") {
    return { layouts: defaultLayouts }
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Ensure all breakpoints have layouts
      return {
        layouts: {
          lg: parsed.layouts?.lg || defaultLayouts.lg,
          md: parsed.layouts?.md || defaultLayouts.md,
          sm: parsed.layouts?.sm || defaultLayouts.sm,
        },
      }
    }
  } catch {
    // Ignore errors, return default
  }
  
  return { layouts: defaultLayouts }
}

export function resetDashboardLayouts(): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.removeItem(STORAGE_KEY)
    // Reload to apply default layout
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  } catch {
    // Ignore errors
  }
}

export function saveDashboardLayouts(layouts: DashboardPreferences["layouts"]): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ layouts }))
  } catch {
    // Ignore errors
  }
}
