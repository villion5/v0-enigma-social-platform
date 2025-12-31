"use client"

import { Plus, MessageCircle } from "lucide-react"

interface FloatingActionButtonProps {
  userType: "user" | "professional"
}

export function FloatingActionButton({ userType }: FloatingActionButtonProps) {
  return (
    <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#DC143C] to-[#FF4444] text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center">
      {userType === "professional" ? <Plus size={28} /> : <MessageCircle size={28} />}
    </button>
  )
}
