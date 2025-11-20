"use client"

import { useRouter } from "next/navigation"
import { clearCurrentUser, getCurrentUser } from "@/lib/storage"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut } from "lucide-react"

interface TopbarProps {
  userEmail?: string
}

export function Topbar({ userEmail }: TopbarProps) {
  const router = useRouter()

  const handleSignOut = () => {
    clearCurrentUser()
    router.push("/login")
    router.refresh()
  }

  const currentUser = userEmail || getCurrentUser()?.email || "User"

  const initials = currentUser
    ? currentUser
        .split("@")[0]
        .split(".")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarFallback className="bg-white/20 text-white">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{currentUser}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

