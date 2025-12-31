"use client"

import { TopBar } from "@/components/home/top-bar"
import { BottomNavigation } from "@/components/home/bottom-navigation"
import { ProfessionalFeed } from "@/components/home/professional-feed"
import { QuickCategories } from "@/components/home/quick-categories"
import { FloatingActionButton } from "@/components/home/floating-action-button"
import { PostCreationBar } from "@/components/home/post-creation-bar"

export default function HomePage() {
  const userType = "user" // Change to "professional" to test professional interface

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-y-auto">
        {/* Post Creation Bar - Only for professionals */}
        {userType === "professional" && <PostCreationBar userType={userType} />}

        {/* Quick Categories */}
        <QuickCategories />

        {/* Professional Feed */}
        <ProfessionalFeed userType={userType} />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation userType={userType} />

      {/* Floating Action Button */}
      <FloatingActionButton userType={userType} />
    </div>
  )
}
