"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url(/enigma-bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center px-4 sm:px-6">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <Image src="/enigma-logo.png" alt="Enigma Logo" width={120} height={120} className="object-contain" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">ENIGMA</h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">Connect with Verified Professionals</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button className="w-full sm:w-auto bg-[#DC143C] hover:bg-red-700 text-white text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
            >
              Login
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
          <div>
            <div className="text-2xl font-bold text-[#FF4444] mb-2">Verified</div>
            <p>All professionals verified</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#FF4444] mb-2">Secure</div>
            <p>Safe escrow payments</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#FF4444] mb-2">Connected</div>
            <p>Trusted platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}
