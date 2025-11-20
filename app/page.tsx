"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/storage"
import { initializeSampleData } from "@/lib/sample-data"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData()
    
    const user = getCurrentUser()
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-muted-foreground">Loading... ✨</div>
    </div>
  )
}

