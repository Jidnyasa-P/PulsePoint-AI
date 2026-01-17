"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface VideoUploadFormProps {
  onUpload: (file: File) => void
  disabled?: boolean
}

export default function VideoUploadForm({ onUpload, disabled }: VideoUploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith("video/")) {
        onUpload(file)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      onUpload(files[0])
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-lg border-2 border-dashed p-8 text-center transition ${
        dragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card/50"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />

      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="font-semibold mb-2">Drop your video here</h3>
      <p className="text-sm text-muted-foreground mb-4">or</p>

      <Button onClick={() => fileInputRef.current?.click()} disabled={disabled} variant="outline">
        Browse Files
      </Button>

      <p className="text-xs text-muted-foreground mt-4">MP4, MOV, WebM • Max 2GB • Recommended: 1920x1080 or higher</p>
    </div>
  )
}
