"use client"

import { DollarSign, TrendingUp, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { TopBar } from "@/components/home/top-bar"

// Mock commission data
const mockCommissions = [
  {
    id: "1",
    bookingId: "B001",
    userName: "Sarah Johnson",
    professionalName: "John's Barbershop",
    amount: 15,
    commission: 2.25,
    type: "booking",
    date: "2025-12-08",
  },
  {
    id: "2",
    bookingId: "B002",
    userName: "Mike Chen",
    professionalName: "Elite Plumbing",
    amount: 40,
    commission: 6,
    type: "booking",
    date: "2025-12-08",
  },
  {
    id: "3",
    bookingId: "B003",
    userName: "Lisa Park",
    professionalName: "Relaxation Spa",
    amount: 25,
    commission: 1.75,
    type: "cancellation",
    date: "2025-12-07",
  },
]

export default function CommissionsPage() {
  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.commission, 0)
  const bookingCommissions = mockCommissions
    .filter((c) => c.type === "booking")
    .reduce((sum, c) => sum + c.commission, 0)
  const cancellationCommissions = mockCommissions
    .filter((c) => c.type === "cancellation")
    .reduce((sum, c) => sum + c.commission, 0)

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <TopBar />

      <main className="flex-1 p-4 pb-24 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Commission Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Commissions</p>
                <p className="text-3xl font-bold text-[#DC143C]">${totalCommissions.toFixed(2)}</p>
              </div>
              <DollarSign size={32} className="text-[#DC143C]/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Booking Commissions (15%)</p>
                <p className="text-3xl font-bold text-green-600">${bookingCommissions.toFixed(2)}</p>
              </div>
              <TrendingUp size={32} className="text-green-600/30" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cancellation Fees (7%)</p>
                <p className="text-3xl font-bold text-orange-600">${cancellationCommissions.toFixed(2)}</p>
              </div>
              <Users size={32} className="text-orange-600/30" />
            </div>
          </Card>
        </div>

        {/* Commission List */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">User</th>
                  <th className="px-6 py-3 text-left font-semibold">Professional</th>
                  <th className="px-6 py-3 text-left font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold">Commission</th>
                  <th className="px-6 py-3 text-left font-semibold">Type</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockCommissions.map((comm) => (
                  <tr key={comm.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{comm.userName}</td>
                    <td className="px-6 py-4">{comm.professionalName}</td>
                    <td className="px-6 py-4 font-medium">${comm.amount}</td>
                    <td className="px-6 py-4 font-semibold text-[#DC143C]">${comm.commission}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          comm.type === "booking" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {comm.type === "booking" ? "Booking (15%)" : "Cancellation (7%)"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{comm.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
