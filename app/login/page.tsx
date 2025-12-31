"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/home")
    }, 1000)
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 px-4"
      style={{ backgroundImage: "url(/enigma-bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur border-0 shadow-2xl">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <Image src="/enigma-logo.png" alt="Enigma Logo" width={80} height={80} className="object-contain" />
            </div>
            <CardTitle className="text-3xl text-[#DC143C]">ENIGMA</CardTitle>
            <CardDescription>Welcome Back</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email or Phone</label>
                <Input
                  type="text"
                  placeholder="Enter your email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-foreground">Remember me</span>
                </label>
                <Link href="#" className="text-[#DC143C] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-[#DC143C] hover:bg-red-700 text-white" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-foreground">Don't have an account? </span>
              <Link href="/signup" className="text-[#DC143C] hover:underline font-semibold">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
