"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Wallet, DollarSign, History, Users, Lock, Edit2, Plus, LogOut } from "lucide-react"

/* =========================================================
   USER-SIDE ESCROW RELEASE LOGIC (TypeScript / React)
   Commission: 15%
   No Firebase
   API-based integration
========================================================= */

const API_BASE_URL = "https://api.yourserver.com"
const COMMISSION_RATE = 0.15

type BookingStatus = "PENDING" | "COMPLETED" | "RELEASED"

interface Booking {
  bookingId: string
  totalAmount: number
  status: BookingStatus
}

interface ReleaseResponse {
  success: boolean
  message: string
  releasedAmount: number
  commissionAmount: number
}

async function releaseEscrowFunds(booking: Booking): Promise<ReleaseResponse> {
  if (booking.status !== "COMPLETED") {
    throw new Error("Job not marked as completed")
  }

  const commissionAmount = booking.totalAmount * COMMISSION_RATE
  const modelAmount = booking.totalAmount - commissionAmount

  const response = await fetch(`${API_BASE_URL}/escrow/release`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookingId: booking.bookingId,
      totalAmount: booking.totalAmount,
      commissionAmount,
      modelAmount,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to release escrow funds")
  }

  return response.json()
}

export default function UserProfilePage() {
  const router = useRouter()

  const [escrowStatus, setEscrowStatus] = useState<string>("")
  const [booking, setBooking] = useState<Booking>({
    bookingId: "BOOKING_12345",
    totalAmount: 1000,
    status: "COMPLETED",
  })

  const handleReleaseFunds = async () => {
    try {
      setEscrowStatus("Releasing funds...")

      const result = await releaseEscrowFunds(booking)

      setEscrowStatus(
        `✅ Funds Released Successfully | Model Amount: ${result.releasedAmount} | Commission (15%): ${result.commissionAmount}`
      )

      setBooking({ ...booking, status: "RELEASED" })
    } catch (error: any) {
      setEscrowStatus(`❌ Error: ${error.message}`)
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#DC143C] to-red-600 text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-white hover:bg-white/20 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-[#DC143C]">
          <CardHeader>
            <CardTitle>Escrow Release</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleReleaseFunds}
              disabled={booking.status === "RELEASED"}
              className="bg-[#DC143C] hover:bg-red-700 text-white"
            >
              Confirm Job Completion & Release Funds
            </Button>
            {escrowStatus && (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {escrowStatus}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
