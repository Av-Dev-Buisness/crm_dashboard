"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Settings, RotateCcw } from "lucide-react"
import { resetDashboardLayouts, getDefaultLayouts } from "@/lib/dashboard-preferences"

export function CustomizeButton() {
  const [open, setOpen] = useState(false)

  const handleReset = () => {
    if (confirm("Reset dashboard to default layout? Your current layout will be lost.")) {
      resetDashboardLayouts()
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Dashboard Settings</DialogTitle>
            <DialogDescription>
              Customize your dashboard layout. Drag widgets to rearrange and resize them by dragging the corners.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">How to customize:</h3>
              <ul className="space-y-1 text-sm text-blue-800 list-disc list-inside">
                <li>Click and drag any widget to move it</li>
                <li>Drag the bottom-right corner to resize</li>
                <li>Changes save automatically</li>
                <li>Layout adapts to your screen size</li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Layout
            </Button>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
