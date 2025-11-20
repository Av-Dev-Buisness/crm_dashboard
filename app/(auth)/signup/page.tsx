"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { setCurrentUser } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Simple localStorage-based auth
    // In a real app, you'd create an account
    // For demo purposes, we'll just set the user
    try {
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        setLoading(false)
        return
      }
      setCurrentUser({ email, name: email.split("@")[0] })
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError("Failed to create account")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
              <span className="text-2xl font-bold text-white">C</span>
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-gradient">Sign Up</CardTitle>
            <CardDescription className="mt-2">Create an account to get started</CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 text-blue-600 flex-shrink-0" />
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-900">Portfolio Demo</p>
                  <p className="text-blue-800">
                    This is a portfolio demonstration. <strong>No actual data is stored or transmitted.</strong> All data is stored locally in your browser&apos;s localStorage and is not sent to any server.
                  </p>
                  <p className="text-blue-800">
                    <strong>How to sign up:</strong> Enter any email address and a password (minimum 6 characters). Your credentials are only stored locally for demo purposes.
                  </p>
                </div>
              </div>
            </div>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

