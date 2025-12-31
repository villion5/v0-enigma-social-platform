"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Clock, Phone, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function OngoingBookingPage() {
  const [userConfirmed, setUserConfirmed] = useState(false)
  const [professionalConfirmed, setProfessionalConfirmed] = useState(false)

  const booking = {
    id: 1,
    professional: "Sarah Johnson",
    category: "Hair Styling",
    price: 50,
    commission: 7.5, // 15%
    userPrice: 50, // User doesn't see commission
    location: "123 Main St, New York",
    time: "2:00 PM - 3:30 PM",
    phone: "+1 (555) 123-4567",
    status: "ongoing",
  }

  const timeline = [
    { event: "Payment Received", completed: true, time: "2:00 PM" },
    { event: "Professional Accepted", completed: true, time: "2:05 PM" },
    { event: "Job Started", completed: true, time: "2:10 PM" },
    { event: "Awaiting Completion Confirmation", completed: false, time: "Pending" },
  ]

  const handleConfirmRelease = (type: "user" | "professional") => {
    if (type === "user") setUserConfirmed(true)
    if (type === "professional") setProfessionalConfirmed(true)
  }

  const bothConfirmed = userConfirmed && professionalConfirmed

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#DC143C] to-red-600 text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/profile/professional">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Ongoing Booking</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Booking Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Professional</p>
                <p className="text-lg font-semibold text-foreground">{booking.professional}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Service</p>
                <p className="text-lg font-semibold text-foreground">{booking.category}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-[#DC143C]" />
                <span>{booking.location}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-5 h-5 text-[#DC143C]" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Phone className="w-5 h-5 text-[#DC143C]" />
                <span>{booking.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Price Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Price:</span>
              <span className="font-semibold">${booking.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>ENIGMA Commission (15%):</span>
              <span>${booking.commission}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
              <span>Professional Receives:</span>
              <span className="text-[#DC143C]">${booking.price - booking.commission}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-[#DC143C] text-white" : "border-2 border-gray-300"
                    }`}
                  >
                    {item.completed && <CheckCircle2 size={20} />}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className={`w-1 h-8 ${timeline[index + 1].completed ? "bg-[#DC143C]" : "bg-gray-300"}`}></div>
                  )}
                </div>
                <div className="py-2">
                  <p className="font-medium text-foreground">{item.event}</p>
                  <p className="text-sm text-gray-600">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Confirmation Section */}
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Dual Confirmation Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-700">
              Both user and professional must confirm job completion before payment is released from escrow.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg border-2 ${userConfirmed ? "border-[#DC143C] bg-[#DC143C]/10" : "border-gray-300 bg-white"}`}
              >
                <p className="font-medium text-foreground mb-3">User Confirmation</p>
                <Button
                  className={`w-full ${userConfirmed ? "bg-[#DC143C] hover:bg-red-700" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                  onClick={() => handleConfirmRelease("user")}
                  disabled={userConfirmed}
                >
                  {userConfirmed ? "Confirmed ✓" : "Confirm Job Completion"}
                </Button>
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${professionalConfirmed ? "border-[#DC143C] bg-[#DC143C]/10" : "border-gray-300 bg-white"}`}
              >
                <p className="font-medium text-foreground mb-3">Professional Confirmation</p>
                <Button
                  className={`w-full ${professionalConfirmed ? "bg-[#DC143C] hover:bg-red-700" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                  onClick={() => handleConfirmRelease("professional")}
                  disabled={professionalConfirmed}
                >
                  {professionalConfirmed ? "Confirmed ✓" : "Confirm Job Completion"}
                </Button>
              </div>
            </div>

            {bothConfirmed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold">
                  Payment released successfully! Professional has received ${booking.price - booking.commission}.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Information */}
        {!bothConfirmed && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
            <p className="font-medium mb-2">Auto-Protection Rule:</p>
            <p>If one party confirms but the other doesn't respond within 48 hours, the admin will investigate.</p>
          </div>
        )}
      </div>
    </div>
  )
}
