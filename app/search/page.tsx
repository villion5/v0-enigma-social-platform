"use client"

import { Search, MapPin, Star, Check, Filter } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookingModal } from "@/components/home/booking-modal"

// Mock professionals data
const mockProfessionals = [
  {
    id: "1",
    name: "John's Barbershop",
    category: "Barber",
    location: "Downtown",
    distance: 2.3,
    price: 25,
    image: "/professional-haircut-service.jpg",
    isVerified: true,
    followers: 1240,
    rating: 4.8,
    bookings: 523,
    gallery: [
      { type: "image", url: "/professional-haircut-service.jpg" },
      { type: "image", url: "/professional-work-.jpg" },
      { type: "video", url: "/placeholder.svg?height=300&width=400" },
    ],
    phone: "024-123-4567",
  },
  {
    id: "2",
    name: "Elite Plumbing",
    category: "Carpenter",
    location: "Midtown",
    distance: 5.1,
    price: 75,
    image: "/professional-plumbing-work.jpg",
    isVerified: true,
    followers: 856,
    rating: 4.9,
    bookings: 341,
    gallery: [
      { type: "image", url: "/professional-plumbing-work.jpg" },
      { type: "image", url: "/professional-work-.jpg" },
    ],
    phone: "024-987-6543",
  },
  {
    id: "3",
    name: "Relaxation Spa",
    category: "Massage",
    location: "West Side",
    distance: 1.8,
    price: 40,
    image: "/professional-massage-service.jpg",
    isVerified: true,
    followers: 2105,
    rating: 4.7,
    bookings: 678,
    gallery: [
      { type: "image", url: "/professional-massage-service.jpg" },
      { type: "image", url: "/professional-haircut-service.jpg" },
      { type: "video", url: "/placeholder.svg?height=300&width=400" },
    ],
    phone: "024-555-8888",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [filters, setFilters] = useState({
    verifiedOnly: false,
    sortBy: "recent", // recent, booked, rated
  })
  const [selectedProfessional, setSelectedProfessional] = useState<(typeof mockProfessionals)[0] | null>(null)
  const [showGallery, setShowGallery] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  // Filter professionals based on search and filters
  const filteredProfessionals = mockProfessionals.filter((pro) => {
    const matchesSearch =
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || pro.category === selectedCategory
    const matchesPrice = pro.price >= priceRange[0] && pro.price <= priceRange[1]
    const matchesVerified = !filters.verifiedOnly || pro.isVerified

    return matchesSearch && matchesCategory && matchesPrice && matchesVerified
  })

  // Sort results
  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    if (filters.sortBy === "booked") return b.bookings - a.bookings
    if (filters.sortBy === "rated") return b.rating - a.rating
    return 0
  })

  const handleViewGallery = (pro: (typeof mockProfessionals)[0]) => {
    setSelectedProfessional(pro)
    setShowGallery(true)
  }

  const handleBookNow = (pro: (typeof mockProfessionals)[0]) => {
    setSelectedProfessional(pro)
    setShowBooking(true)
  }

  return (
    <div className="flex flex-col bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Search professionals, category, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline" className="px-3 bg-transparent">
                <Filter size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 py-4">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="space-y-2">
                    {["Barber", "Carpenter", "Chef", "Massage"].map((cat) => (
                      <div key={cat} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={selectedCategory === cat}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="rounded-full"
                        />
                        <label className="text-sm cursor-pointer">{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>

                {/* Verified Only */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={filters.verifiedOnly}
                    onCheckedChange={(checked) => setFilters({ ...filters, verifiedOnly: checked as boolean })}
                  />
                  <label className="text-sm cursor-pointer">Verified Only</label>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-semibold mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {["recent", "booked", "rated"].map((sort) => (
                      <div key={sort} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sort"
                          value={sort}
                          checked={filters.sortBy === sort}
                          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                          className="rounded-full"
                        />
                        <label className="text-sm cursor-pointer capitalize">
                          {sort === "booked" ? "Most Booked" : sort === "rated" ? "Highest Rated" : "Most Recent"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Results */}
      <main className="flex-1 p-4">
        {sortedProfessionals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No professionals found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedProfessionals.map((pro) => (
              <Card key={pro.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex gap-3 p-3">
                  {/* Profile Picture */}
                  <div
                    className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#DC143C] to-[#FF4444] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleViewGallery(pro)}
                  >
                    <img src={pro.image || "/placeholder.svg"} alt={pro.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{pro.name}</h3>
                        {pro.isVerified && <Check size={16} className="text-[#DC143C] fill-current" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{pro.category}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <MapPin size={12} />
                        {pro.location} ({pro.distance} km)
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Star size={14} className="fill-[#DC143C] text-[#DC143C]" />
                        <span>{pro.rating}</span>
                        <span className="text-muted-foreground">({pro.followers} followers)</span>
                      </div>
                      <div className="font-bold text-[#DC143C]">${pro.price}</div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    className="bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white self-center"
                    onClick={() => handleBookNow(pro)}
                  >
                    Book
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedProfessional?.name}
              {selectedProfessional?.isVerified && <Check size={18} className="text-[#DC143C] fill-current" />}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {selectedProfessional?.gallery.map((item, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {item.type === "image" ? (
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <video src={item.url} controls className="w-full h-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowGallery(false)}>
              Close
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white"
              onClick={() => {
                setShowGallery(false)
                selectedProfessional && handleBookNow(selectedProfessional)
              }}
            >
              Book Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedProfessional && (
        <BookingModal
          isOpen={showBooking}
          onOpenChange={setShowBooking}
          professional={{
            id: selectedProfessional.id,
            name: selectedProfessional.name,
            price: selectedProfessional.price,
            phone: selectedProfessional.phone,
          }}
        />
      )}
    </div>
  )
}
