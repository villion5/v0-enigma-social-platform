"use client"

import { Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, message: "John accepted your booking request", time: "2 min ago" },
    { id: 2, message: "New professional joined in your area", time: "1 hour ago" },
    { id: 3, message: "Payment released to your wallet", time: "3 hours ago" },
  ]

  return (
    <>
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 max-w-full">
          <Link href="/home" className="flex items-center gap-3">
            <Image src="/enigma-logo.png" alt="Enigma Logo" width={40} height={40} className="object-contain" />
            <div className="text-xl font-bold text-[#DC143C]">ENIGMA</div>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNotifications(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell size={20} className="text-foreground" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC143C] rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-medium text-foreground">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
