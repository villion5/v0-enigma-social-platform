"use client"

import { MoreHorizontal } from "lucide-react"

const categories = [
  { icon: "🔧", name: "Plumbing" },
  { icon: "💇", name: "Haircut" },
  { icon: "💆", name: "Massage" },
  { icon: "🔨", name: "Carpentry" },
  { icon: "🍳", name: "Chef" },
  { icon: "🧹", name: "Cleaning" },
  { icon: "🚗", name: "Mechanic" },
]

export function QuickCategories() {
  return (
    <div className="px-4 py-6 border-b border-border">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.name}
            className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-br from-[#DC143C]/10 to-[#FF4444]/10 hover:from-[#DC143C]/20 hover:to-[#FF4444]/20 transition-all flex-shrink-0 border border-[#DC143C]/20"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-xs font-medium text-foreground text-center">{category.name}</span>
          </button>
        ))}
        <button className="flex items-center justify-center px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0">
          <MoreHorizontal size={20} className="text-foreground" />
        </button>
      </div>
    </div>
  )
}
