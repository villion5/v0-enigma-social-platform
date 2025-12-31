"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, MapPin } from "lucide-react"

export default function SignupPage() {
  const [userType, setUserType] = useState<"professional" | "user">("user")
  const [loading, setLoading] = useState(false)
  const [profilePictures, setProfilePictures] = useState<string[]>([])
  const [workableLocations, setWorkableLocations] = useState<string[]>(Array(20).fill(""))
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/home")
    }, 1000)
  }

  const handleAddProfilePicture = () => {
    if (profilePictures.length < 4) {
      setProfilePictures([...profilePictures, `/placeholder.svg?height=100&width=100`])
    }
  }

  const handleRemoveProfilePicture = (index: number) => {
    setProfilePictures(profilePictures.filter((_, i) => i !== index))
  }

  const handleLocationChange = (index: number, value: string) => {
    const newLocations = [...workableLocations]
    newLocations[index] = value
    setWorkableLocations(newLocations)
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 px-4"
      style={{ backgroundImage: "url(/enigma-bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <Card className="bg-white/95 backdrop-blur border-0 shadow-2xl">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <Image src="/enigma-logo.png" alt="Enigma Logo" width={80} height={80} className="object-contain" />
            </div>
            <CardTitle className="text-3xl text-[#DC143C]">ENIGMA</CardTitle>
            <CardDescription>Create Your Account</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "professional" | "user")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User / Client</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input placeholder="Enter your full name" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number (for OTP verification)
                    </label>
                    <Input type="tel" placeholder="Enter your phone number" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mobile Money Number (for payments)
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter your mobile money number"
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input type="email" placeholder="Enter your email" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                    <Input type="password" placeholder="Create a password" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                    <Input type="password" placeholder="Re-enter your password" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Profile Picture (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#DC143C] transition cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload profile picture</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#DC143C] hover:bg-red-700 text-white" disabled={loading}>
                    {loading ? "Creating Account..." : "Sign Up as User"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4 mt-6 max-h-[70vh] overflow-y-auto pr-2">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-sm text-amber-800">
                    Your account will be pending verification. Admin will review and approve your profile.
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input placeholder="Enter your full name" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Username</label>
                    <Input placeholder="Choose a unique username" className="border-gray-300" required />
                    <p className="text-xs text-gray-500 mt-1">This will be your public profile name on ENIGMA</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number (for OTP verification)
                    </label>
                    <Input type="tel" placeholder="Enter your phone number" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mobile Money Number (for receiving payments)
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter your mobile money number"
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input type="email" placeholder="Enter your email" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                    <Input type="password" placeholder="Create a password" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                    <Input type="password" placeholder="Re-enter your password" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Profile Pictures (4 required)
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {profilePictures.map((pic, index) => (
                        <div
                          key={index}
                          className="relative aspect-square border-2 border-gray-300 rounded-lg overflow-hidden group"
                        >
                          <Image
                            src={pic || "/placeholder.svg"}
                            alt={`Profile ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProfilePicture(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {profilePictures.length < 4 && (
                        <button
                          type="button"
                          onClick={handleAddProfilePicture}
                          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-[#DC143C] transition cursor-pointer"
                        >
                          <Upload className="h-6 w-6 text-gray-400" />
                          <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{profilePictures.length} of 4 pictures added</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Professional Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-foreground" required>
                      <option value="">Select your profession</option>
                      <option value="plumber">Plumber</option>
                      <option value="carpenter">Carpenter</option>
                      <option value="electrician">Electrician</option>
                      <option value="barber">Barber / Hair Stylist</option>
                      <option value="masseur">Massage Therapist</option>
                      <option value="chef">Chef / Cook</option>
                      <option value="mechanic">Mechanic</option>
                      <option value="painter">Painter</option>
                      <option value="tailor">Tailor</option>
                      <option value="cleaner">Cleaner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">GPS Business Location</label>
                    <div className="flex gap-2">
                      <Input placeholder="Latitude, Longitude" className="border-gray-300 flex-1" />
                      <Button type="button" variant="outline" className="shrink-0 bg-transparent">
                        <MapPin size={16} className="mr-1" />
                        Get GPS
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Actual Business Address</label>
                    <Input placeholder="Enter your physical business address" className="border-gray-300" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Workable Locations (20 locations - helps clients find you)
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                      {workableLocations.map((location, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-8">{index + 1}.</span>
                          <Input
                            placeholder={`Location ${index + 1} (e.g., Accra, Kumasi, Tema)`}
                            className="border-gray-300 text-sm"
                            value={location}
                            onChange={(e) => handleLocationChange(index, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter all locations where you can provide services. This helps users find you when searching by
                      location.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Professional Bio</label>
                    <textarea
                      placeholder="Tell clients about your experience and services..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-foreground resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#DC143C] hover:bg-red-700 text-white" disabled={loading}>
                    {loading ? "Submitting for Verification..." : "Submit Professional Account"}
                  </Button>

                  <p className="text-xs text-gray-600 text-center">
                    After submission, your account will be reviewed by our admin team. You'll receive an SMS once
                    approved.
                  </p>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <span className="text-foreground">Already have an account? </span>
              <Link href="/login" className="text-[#DC143C] hover:underline font-semibold">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
