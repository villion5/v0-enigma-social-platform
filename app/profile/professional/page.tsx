"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Star,
  MapPin,
  ArrowLeft,
  CheckCircle,
  Wallet,
  Clock,
  Users,
  Plus,
  X,
  DollarSign,
  TrendingUp,
  Eye,
  ImageIcon,
  LogOut,
} from "lucide-react"

export default function ProfessionalProfilePage() {
  const router = useRouter()
  const [pendingBookings, setPendingBookings] = useState([
    { id: 1, userName: "John Doe", service: "Haircut", date: "2025-12-15", time: "2:00 PM", phone: "024-555-1111" },
    { id: 2, userName: "Jane Smith", service: "Trim", date: "2025-12-16", time: "3:30 PM", phone: "024-555-2222" },
  ])

  const [profilePictures, setProfilePictures] = useState<(string | null)[]>(Array(6).fill(null))
  const [workableLocations, setWorkableLocations] = useState<string[]>(Array(20).fill(""))
  const [locationInput, setLocationInput] = useState("")
  const [showFollowers, setShowFollowers] = useState(false)
  const [activeView, setActiveView] = useState("info")

  const followers = [
    { id: 1, name: "Alice Johnson", avatar: "A" },
    { id: 2, name: "Bob Smith", avatar: "B" },
    { id: 3, name: "Carol White", avatar: "C" },
    { id: 4, name: "David Brown", avatar: "D" },
    { id: 5, name: "Emma Davis", avatar: "E" },
  ]

  const handleBookingAction = (id: number, action: "accept" | "reject") => {
    setPendingBookings(pendingBookings.filter((booking) => booking.id !== id))
  }

  const handleAddLocation = () => {
    if (locationInput.trim()) {
      const emptyIndex = workableLocations.findIndex((loc) => loc === "")
      if (emptyIndex !== -1) {
        const newLocations = [...workableLocations]
        newLocations[emptyIndex] = locationInput
        setWorkableLocations(newLocations)
        setLocationInput("")
      }
    }
  }

  const handleRemoveLocation = (index: number) => {
    const newLocations = [...workableLocations]
    newLocations[index] = ""
    setWorkableLocations(newLocations)
  }

  const handleProfilePictureUpload = (index: number) => {
    setProfilePictures((prev) => {
      const updated = [...prev]
      updated[index] = `/professional-profile.png?v=${index + 1}`
      return updated
    })
  }

  const handleLogout = () => {
    // Clear professional session/tokens here
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#DC143C] to-red-600 text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Professional Profile</h1>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-white hover:bg-white/20 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-[#DC143C]">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src="/professional-profile.png"
                  alt="Profile"
                  className="w-48 h-48 rounded-lg object-cover border-4 border-[#DC143C]"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-3xl font-bold text-foreground">Sarah Johnson</h2>
                    <CheckCircle className="w-6 h-6 text-[#DC143C]" />
                  </div>
                  <p className="text-xl text-gray-600">@sarahjohnson</p>
                  <p className="text-lg font-semibold text-[#DC143C]">Hair Stylist</p>
                </div>

                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 text-[#DC143C]" />
                  <span>Manhattan, New York</span>
                </div>

                <div className="flex items-center gap-6">
                  <button onClick={() => setShowFollowers(!showFollowers)} className="hover:opacity-80 transition">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#DC143C]" />
                      <div>
                        <p className="text-2xl font-bold text-foreground">1,234</p>
                        <p className="text-sm text-gray-600">Followers</p>
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">4.8</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#DC143C]" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">8 years</p>
                      <p className="text-sm text-gray-600">Experience</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Professional hair stylist with 8 years of experience. Specializing in trendy cuts, color treatments,
                  and extensions.
                </p>
              </div>
            </div>

            {showFollowers && (
              <div className="mt-6 p-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Followers ({followers.length})</h3>
                  <button onClick={() => setShowFollowers(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {followers.map((follower) => (
                    <div key={follower.id} className="p-3 border border-gray-200 rounded-lg flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC143C] to-[#FF4444] flex items-center justify-center text-white font-bold">
                        {follower.avatar}
                      </div>
                      <span className="text-sm font-medium">{follower.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-[#DC143C]/10 to-red-600/10">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-[#DC143C]" />
              Price Determination
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Base Price</label>
                <Input type="number" defaultValue="50" prefix="$" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Travel / Transportation Fee</label>
                <Input type="number" defaultValue="15" prefix="$" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Service Options</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Service name (e.g., Hair Coloring)" className="flex-1" />
                  <Input type="number" placeholder="Price" className="w-32" prefix="$" />
                  <Button variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 border border-gray-300 rounded-md bg-gray-50 flex justify-between items-center">
                  <span className="font-medium">Hair Coloring</span>
                  <span className="text-[#DC143C] font-bold">$75</span>
                </div>
                <div className="p-3 border border-gray-300 rounded-md bg-gray-50 flex justify-between items-center">
                  <span className="font-medium">Extensions</span>
                  <span className="text-[#DC143C] font-bold">$120</span>
                </div>
              </div>
            </div>

            <Button className="bg-[#DC143C] hover:bg-red-700 text-white w-full">Update Pricing</Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DC143C]">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="text-xl font-bold text-foreground">Ready to book with me?</h3>
              <p className="text-gray-600">Users can click below to book my services</p>
              <Button className="bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white font-bold text-lg py-6 px-12">
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-600/10">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-green-600">$3,450</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <p className="text-sm text-gray-600 mb-1">Pending Escrow</p>
                <p className="text-3xl font-bold text-yellow-600">$580</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Released Earnings</p>
                <p className="text-3xl font-bold text-blue-600">$2,870</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Payout Method</label>
                <p className="text-gray-600">Mobile Money Only</p>
                <Input defaultValue="+1 (555) 123-4567" className="mt-2" />
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-[#DC143C] hover:bg-red-700 text-white">
                  <Wallet className="w-4 h-4 mr-2" />
                  Request Withdrawal
                </Button>
                <Link href="/bookings/ongoing" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Clock className="w-4 h-4 mr-2" />
                    Release Confirmation
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-[#DC143C]" />
              Profile Pictures (6 Slots)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profilePictures.map((picture, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-[#DC143C] bg-gray-100 flex items-center justify-center relative group cursor-pointer hover:border-[#FF4444] transition-colors"
                  onClick={() => handleProfilePictureUpload(index)}
                >
                  {picture ? (
                    <img
                      src={picture || "/placeholder.svg"}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Plus className="w-8 h-8 mb-2" />
                      <span className="text-xs">Add Photo {index + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#DC143C]" />
              Workable Locations (20 Slots)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Add locations where you can provide your services. This helps users find you when searching by location.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter location name (e.g., Manhattan, Brooklyn)"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddLocation()}
              />
              <Button className="bg-[#DC143C] hover:bg-red-700 text-white" onClick={handleAddLocation}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {workableLocations.map((location, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between group min-h-[48px]"
                >
                  {location ? (
                    <>
                      <span className="text-sm font-medium text-foreground truncate">{location}</span>
                      <button
                        onClick={() => handleRemoveLocation(index)}
                        className="opacity-0 group-hover:opacity-100 transition ml-2 flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-[#DC143C]" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">Slot {index + 1} empty</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-[#DC143C]/10 to-red-600/10">
            <CardTitle>Booking Confirmation Section</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Accept or reject booking requests. Once you accept ONE booking, you will no longer appear in search
              results until you press "Release Confirmation" after completing the job.
            </p>
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => (
                <div key={booking.id} className="p-4 border-2 border-gray-300 rounded-lg bg-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-bold text-lg text-foreground">{booking.userName}</p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {booking.date} at {booking.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Contact: {booking.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleBookingAction(booking.id, "accept")}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                        onClick={() => handleBookingAction(booking.id, "reject")}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No pending bookings at the moment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
