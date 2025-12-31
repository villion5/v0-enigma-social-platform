"use client"

import { Search, User, Wallet, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface BottomNavigationProps {
  userType: "user" | "professional"
}

export function BottomNavigation({ userType }: BottomNavigationProps) {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-t border-border z-50">
      <div className="flex items-center justify-around h-16 px-4 max-w-full">
        <Link
          href={userType === "user" ? "/wallet" : "/dashboard"}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {userType === "user" ? (
            <>
              <Wallet size={24} className="text-[#DC143C]" />
              <span className="text-xs font-medium">Wallet</span>
            </>
          ) : (
            <>
              <LayoutGrid size={24} className="text-[#DC143C]" />
              <span className="text-xs font-medium">Dashboard</span>
            </>
          )}
        </Link>

        {userType === "user" && (
          <Link
            href="/search"
            className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-[#DC143C] to-[#FF4444] rounded-full text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
          >
            <Search size={28} />
          </Link>
        )}

        {/* Right: Profile Button */}
        <Link
          href={userType === "user" ? "/profile/user" : "/profile/professional"}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <User size={24} className="text-[#DC143C]" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </div>
  )
}
