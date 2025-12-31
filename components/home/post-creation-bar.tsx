"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus, Video, Type, X } from "lucide-react"

interface PostCreationBarProps {
  userType: "user" | "professional"
}

export function PostCreationBar({ userType }: PostCreationBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMode, setExpandedMode] = useState<"text" | "photo" | "video" | null>(null)
  const [postContent, setPostContent] = useState("")
  const [mediaFiles, setMediaFiles] = useState<{ type: "image" | "video"; file: File; preview: string }[]>([])
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  if (userType !== "professional") return null

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        type: "image" as const,
        file,
        preview: URL.createObjectURL(file),
      }))
      setMediaFiles([...mediaFiles, ...newFiles])
      setIsOpen(true)
      setExpandedMode("photo")
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        type: "video" as const,
        file,
        preview: URL.createObjectURL(file),
      }))
      setMediaFiles([...mediaFiles, ...newFiles])
      setIsOpen(true)
      setExpandedMode("video")
    }
  }

  const handleTextClick = () => {
    setIsOpen(true)
    setExpandedMode("text")
  }

  const handleRemoveMedia = (index: number) => {
    // Clean up object URL to prevent memory leaks
    URL.revokeObjectURL(mediaFiles[index].preview)
    setMediaFiles(mediaFiles.filter((_, i) => i !== index))
  }

  const handlePostSubmit = () => {
    if (postContent.trim() || mediaFiles.length > 0) {
      // Post submission logic here
      console.log("[v0] Posting:", {
        content: postContent,
        media: mediaFiles.map((m) => ({ type: m.type, name: m.file.name, size: m.file.size })),
      })

      // Clean up object URLs
      mediaFiles.forEach((m) => URL.revokeObjectURL(m.preview))

      setPostContent("")
      setMediaFiles([])
      setIsOpen(false)
      setExpandedMode(null)
    }
  }

  const handleCancel = () => {
    // Clean up object URLs
    mediaFiles.forEach((m) => URL.revokeObjectURL(m.preview))
    setPostContent("")
    setMediaFiles([])
    setIsOpen(false)
    setExpandedMode(null)
  }

  return (
    <div className="px-4 py-3">
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        multiple
        className="hidden"
      />
      <input
        type="file"
        ref={videoInputRef}
        onChange={handleVideoUpload}
        accept="video/*"
        multiple
        className="hidden"
      />

      {!isOpen ? (
        <Card className="bg-white">
          <CardContent className="p-4">
            <button
              onClick={handleTextClick}
              className="w-full text-left px-4 py-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition"
            >
              What's on your mind? Share your work...
            </button>
            <div className="flex gap-2 mt-3 justify-center">
              <button
                onClick={() => photoInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition flex-1 justify-center"
              >
                <ImagePlus size={18} className="text-[#DC143C]" />
                <span className="text-sm">Photo</span>
              </button>
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition flex-1 justify-center"
              >
                <Video size={18} className="text-[#DC143C]" />
                <span className="text-sm">Video</span>
              </button>
              <button
                onClick={handleTextClick}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition flex-1 justify-center"
              >
                <Type size={18} className="text-[#DC143C]" />
                <span className="text-sm">Text</span>
              </button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">
                Create a Post
                {expandedMode && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({expandedMode === "text" ? "Text" : expandedMode === "photo" ? "Photo" : "Video"})
                  </span>
                )}
              </h3>
              <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              placeholder="Share your work, tips, or updates with potential clients..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-[#DC143C]"
              rows={expandedMode === "text" ? 6 : 4}
            />

            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {mediaFiles.map((media, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                    {media.type === "image" ? (
                      <img
                        src={media.preview || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video src={media.preview} className="w-full h-full object-cover" controls />
                    )}
                    <button
                      onClick={() => handleRemoveMedia(index)}
                      className="absolute top-2 right-2 bg-[#DC143C] text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {media.type === "image" ? "Photo" : "Video"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => photoInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition flex-1 justify-center border border-gray-200"
              >
                <ImagePlus size={16} className="text-[#DC143C]" />
                <span className="text-sm">Add Photo</span>
              </button>
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition flex-1 justify-center border border-gray-200"
              >
                <Video size={16} className="text-[#DC143C]" />
                <span className="text-sm">Add Video</span>
              </button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-[#DC143C] to-[#FF4444] hover:from-[#B8102F] hover:to-[#E63333] text-white"
                onClick={handlePostSubmit}
                disabled={!postContent.trim() && mediaFiles.length === 0}
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
