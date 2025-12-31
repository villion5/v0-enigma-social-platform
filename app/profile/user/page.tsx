"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Wallet, DollarSign, History, Users, Lock, Edit2, Plus, LogOut } from "lucide-react"

export default function UserProfilePage() {
  const router = useRouter()
  const [following] = useState([
    { id: 1, name: "Sarah Johnson", profession: "Hair Stylist", location: "Manhattan", avatar: "S" },
    { id: 2, name: "Mike Williams", profession: "Plumber", location: "Brooklyn", avatar: "M" },
    { id: 3, name: "Emma Davis", profession: "Electrician", location: "Queens", avatar: "E" },
  ])

  const [paymentHistory] = useState([
    {
      id: 1,
      service: "Haircut",
      professional: "Sarah Johnson",
      amount: "$50",
      date: "2025-12-10",
      status: "Completed",
    },
    {
      id: 2,
      service: "Plumbing Repair",
      professional: "Mike Williams",
      amount: "$120",
      date: "2025-12-08",
      status: "Completed",
    },
  ])

  const [transactionHistory] = useState([
    { id: 1, type: "Deposit", amount: "+$100", date: "2025-12-12", method: "Mobile Money" },
    { id: 2, type: "Payment", amount: "-$50", date: "2025-12-10", method: "Booking Payment" },
    { id: 3, type: "Deposit", amount: "+$200", date: "2025-12-08", method: "Bank Card" },
  ])

  const handleLogout = () => {
    // Clear user session/tokens here
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img
                  src="/user-profile-illustration.png"
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-[#DC143C]"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">John Doe</h2>
                  <p className="text-gray-600">john.doe@email.com</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>

                <Button className="bg-[#DC143C] hover:bg-red-700 text-white" size="sm">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DC143C]">
          <CardHeader className="bg-gradient-to-r from-[#DC143C]/10 to-red-600/10">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-[#DC143C]" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-5xl font-bold text-[#DC143C]">$250.00</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Link href="/wallet">
                  <Button className="bg-[#DC143C] hover:bg-red-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Deposit Money
                  </Button>
                </Link>
                <Button variant="outline">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#DC143C]" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-foreground">{payment.service}</p>
                    <p className="text-sm text-gray-600">{payment.professional}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#DC143C]">{payment.amount}</p>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#DC143C]" />
              Following Professionals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {following.map((professional) => (
                <div
                  key={professional.id}
                  className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DC143C] to-[#FF4444] flex items-center justify-center text-white font-bold text-lg">
                      {professional.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{professional.name}</p>
                      <p className="text-sm text-gray-600">{professional.profession}</p>
                      <p className="text-xs text-gray-500">{professional.location}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Unfollow
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactionHistory.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-foreground">{transaction.type}</p>
                    <p className="text-sm text-gray-600">{transaction.method}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <p
                    className={`font-bold text-lg ${transaction.amount.startsWith("+") ? "text-green-600" : "text-[#DC143C]"}`}
                  >
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#DC143C]" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
            <Button className="bg-[#DC143C] hover:bg-red-700 text-white">Reset Password</Button>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Two-Factor Authentication</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
