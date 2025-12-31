"use client"

import { MapPin, Phone, Lock } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface BookingModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  professional: {
    id: string
    name: string
    price: number
    phone?: string
  }
}

export function BookingModal({ isOpen, onOpenChange, professional }: BookingModalProps) {
  const [location, setLocation] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const commission = professional.price * 0.15
  const totalPrice = professional.price

  const handleBooking = () => {
    if (location.trim() && userPhone.trim() && mobileMoneyNumber.trim()) {
      setShowConfirmation(true)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {!showConfirmation ? (
          <>
            <DialogHeader>
              <DialogTitle>Book Appointment</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Professional Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground">{professional.name}</h3>
                <p className="text-2xl font-bold text-[#DC143C] mt-2">${professional.price}</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Your Telephone Number</label>
                <Input
                  placeholder="e.g., +1 555 123 4567"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Your Mobile Money Number</label>
                <Input
                  placeholder="e.g., Airtel Money / M-Pesa number"
                  value={mobileMoneyNumber}
                  onChange={(e) => setMobileMoneyNumber(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Location Input */}
              <div>
                <label className="text-sm font-medium mb-2 block">Service Location</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your address or use GPS"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline" className="px-3 bg-transparent">
                    <MapPin size={18} />
                  </Button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-sm font-medium mb-3 block">Payment Method</label>
                <div className="space-y-2">
                  {[
                    { id: "wallet", label: "Pay from Wallet" },
                    { id: "card", label: "Bank Card" },
                    { id: "momo", label: "Mobile Money" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setPaymentMethod(id)}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                        paymentMethod === id
                          ? "border-[#DC143C] bg-[#DC143C]/10"
                          : "border-border hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Price:</span>
                  <span className="font-medium">${professional.price}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-[#DC143C]">${totalPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white font-semibold"
                  onClick={handleBooking}
                  disabled={!location.trim() || !userPhone.trim() || !mobileMoneyNumber.trim()}
                >
                  <Lock size={18} className="mr-2" />
                  Pay Securely
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Payment Confirmed</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-green-700">Payment Received Successfully!</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Professional Contact</p>
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Phone size={16} className="text-[#DC143C]" />
                    {professional.phone || "024*****96"}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs text-muted-foreground mb-1">Booking Details</p>
                  <p className="text-sm text-foreground">{location}</p>
                  <p className="text-sm font-semibold text-[#DC143C] mt-2">Amount: ${totalPrice}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-700">
                  <Lock size={14} className="inline mr-2" />
                  Payment held in secure escrow until job completion
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white font-semibold"
                onClick={() => onOpenChange(false)}
              >
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
