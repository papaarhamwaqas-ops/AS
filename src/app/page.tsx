"use client"

import { useState } from "react"
import { LandingHero } from "@/components/landing-hero"
import { ExpenseDashboard } from "@/components/expense-dashboard"

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false)

  return (
    <main className="min-h-screen bg-black">
      {showDashboard ? (
        <div className="animate-in fade-in duration-700">
          <ExpenseDashboard />
        </div>
      ) : (
        <LandingHero onGetStarted={() => setShowDashboard(true)} />
      )}
    </main>
  )
}