"use client"

import { CreditCard, Smartphone, Plus, History } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TopBar } from "@/components/home/top-bar"

// Mock transaction data
const mockTransactions = [
  {
    id: "1",
    type: "deposit",
    method: "Mobile Money",
    amount: 50,
    status: "completed",
    date: "2025-12-08",
    time: "10:30 AM",
  },
  {
    id: "2",
    type: "booking",
    method: "Booking Payment",
    amount: -25,
    status: "completed",
    date: "2025-12-07",
    time: "2:15 PM",
  },
  {
    id: "3",
    type: "refund",
    method: "Cancelled Booking",
    amount: 23.25,
    status: "completed",
    date: "2025-12-06",
    time: "5:45 PM",
  },
  {
    id: "4",
    type: "deposit",
    method: "Bank Card",
    amount: 100,
    status: "completed",
    date: "2025-12-05",
    time: "11:20 AM",
  },
]

export default function WalletPage() {
  const [walletBalance] = useState(148.25)
  const [isDepositing, setIsDepositing] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <TopBar />

      <main className="flex-1 p-4 pb-24 max-w-2xl mx-auto w-full">
        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-br from-[#DC143C] to-[#FF4444] text-white p-6 mb-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-white/80 text-sm mb-1">Wallet Balance</p>
              <h1 className="text-4xl font-bold">${walletBalance.toFixed(2)}</h1>
            </div>
            <CreditCard size={32} />
          </div>

          {/* Quick Deposit Buttons */}
          <div className="flex gap-2">
            <Dialog open={isDepositing} onOpenChange={setIsDepositing}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-white text-[#DC143C] hover:bg-gray-100 font-semibold">
                  <Plus size={18} className="mr-2" />
                  Add Money
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deposit Money</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount ($)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Payment Method</label>
                    <div className="space-y-2">
                      {[
                        { id: "momo", label: "Mobile Money", icon: Smartphone },
                        { id: "card", label: "Bank Card", icon: CreditCard },
                        { id: "ussd", label: "USSD", icon: Smartphone },
                        { id: "paystack", label: "Paystack", icon: CreditCard },
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Icon size={20} className="text-[#DC143C]" />
                          <span className="font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white font-semibold">
                    Proceed to Payment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Transaction History */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <History size={20} className="text-[#DC143C]" />
            <h2 className="text-xl font-bold">Transaction History</h2>
          </div>

          <div className="space-y-2">
            {mockTransactions.map((tx) => (
              <Card key={tx.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{tx.method}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.date} at {tx.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.amount > 0 ? "text-green-600" : "text-foreground"}`}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </p>
                    <span className="text-xs text-muted-foreground capitalize">{tx.status}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
