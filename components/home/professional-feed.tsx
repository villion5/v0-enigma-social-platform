"use client"

import { Heart, MessageCircle, MapPin, Check, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "./booking-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Post {
  id: string
  professionalId: string
  professionalName: string
  professionalPhone: string
  category: string
  categoryIcon: string
  location: string
  price: number
  image: string
  likes: number
  comments: number
  isVerified: boolean
}

interface ProfessionalFeedProps {
  userType: "user" | "professional"
}

const mockPosts: Post[] = [
  {
    id: "1",
    professionalId: "p1",
    professionalName: "John's Barbershop",
    professionalPhone: "024-555-0123",
    category: "Haircut",
    categoryIcon: "💇",
    location: "Downtown, 2.3 km away",
    price: 15,
    image: "/professional-haircut-service.jpg",
    likes: 245,
    comments: 18,
    isVerified: true,
  },
  {
    id: "2",
    professionalId: "p2",
    professionalName: "Elite Plumbing",
    professionalPhone: "024-555-0456",
    category: "Plumbing",
    categoryIcon: "🔧",
    location: "Midtown, 5.1 km away",
    price: 40,
    image: "/professional-plumbing-work.jpg",
    likes: 156,
    comments: 12,
    isVerified: true,
  },
  {
    id: "3",
    professionalId: "p3",
    professionalName: "Relaxation Spa",
    professionalPhone: "024-555-0789",
    category: "Massage",
    categoryIcon: "💆",
    location: "West Side, 1.8 km away",
    price: 25,
    image: "/professional-massage-service.jpg",
    likes: 389,
    comments: 34,
    isVerified: true,
  },
]

export function ProfessionalFeed({ userType }: ProfessionalFeedProps) {
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; professional?: Post }>({
    isOpen: false,
  })
  const [galleryModal, setGalleryModal] = useState<{ isOpen: boolean; post?: Post }>({
    isOpen: false,
  })

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleBookClick = (post: Post) => {
    setBookingModal({ isOpen: true, professional: post })
  }

  const handleImageClick = (post: Post) => {
    if (userType === "user") {
      setGalleryModal({ isOpen: true, post })
    }
  }

  return (
    <>
      <div className="space-y-4 px-4 py-4">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#DC143C] to-[#FF4444] rounded-full flex items-center justify-center text-white font-bold">
                  {post.professionalName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{post.professionalName}</h3>
                    {post.isVerified && <Check size={16} className="text-[#DC143C] fill-current" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{post.category}</p>
                </div>
              </div>
            </div>

            {/* Post Image */}
            <div
              className={`relative w-full aspect-square bg-gray-100 ${userType === "user" ? "cursor-pointer hover:opacity-95 transition-opacity" : ""}`}
              onClick={() => handleImageClick(post)}
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.professionalName}
                className="w-full h-full object-cover"
              />
              {userType === "user" && (
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  Tap to view more
                </div>
              )}
            </div>

            {/* Post Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {post.location}
                  </div>
                  <div className="text-[#DC143C] font-semibold">${post.price}</div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">❤️ {post.likes} likes</span>
                <span className="flex items-center gap-1">💬 {post.comments} comments</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex-1 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 ${
                    liked[post.id] ? "bg-[#DC143C]/20 text-[#DC143C]" : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                >
                  <Heart size={18} fill={liked[post.id] ? "currentColor" : "none"} />
                  Like
                </button>
                <button className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-medium text-sm flex items-center justify-center gap-2 text-foreground">
                  <MessageCircle size={18} />
                  Comment
                </button>
                {userType === "user" && (
                  <Button
                    className="flex-1 bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white font-medium"
                    onClick={() => handleBookClick(post)}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {userType === "user" && bookingModal.professional && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onOpenChange={(open) => setBookingModal({ ...bookingModal, isOpen: open })}
          professional={{
            id: bookingModal.professional.professionalId,
            name: bookingModal.professional.professionalName,
            price: bookingModal.professional.price,
            phone: bookingModal.professional.professionalPhone,
          }}
        />
      )}

      {/* Gallery Modal */}
      {userType === "user" && galleryModal.post && (
        <Dialog open={galleryModal.isOpen} onOpenChange={(open) => setGalleryModal({ ...galleryModal, isOpen: open })}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{galleryModal.post.professionalName}</span>
                  {galleryModal.post.isVerified && <Check size={20} className="text-[#DC143C] fill-current" />}
                </DialogTitle>
                <button
                  onClick={() => setGalleryModal({ isOpen: false })}
                  className="rounded-full p-2 hover:bg-gray-100 transition"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-600">{galleryModal.post.category}</p>
            </DialogHeader>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {/* Sample gallery images/videos */}
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#DC143C]">
                <img
                  src={galleryModal.post.image || "/placeholder.svg"}
                  alt="Work 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300">
                <img src="/professional-work-.jpg" alt="Work 2" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300">
                <video src="/placeholder.svg?height=400&width=400" className="w-full h-full object-cover" controls />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300">
                <img src="/professional-haircut-service.jpg" alt="Work 3" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300">
                <img src="/professional-plumbing-work.jpg" alt="Work 4" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300">
                <video src="/placeholder.svg?height=400&width=400" className="w-full h-full object-cover" controls />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white font-bold text-lg py-6"
                onClick={() => {
                  setGalleryModal({ isOpen: false })
                  handleBookClick(galleryModal.post!)
                }}
              >
                Book Now - ${galleryModal.post.price}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
