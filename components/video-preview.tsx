"use client"

import { useState, useRef } from "react"
import { Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPreviewProps {
  file: File
}

export default function VideoPreview({ file }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const videoUrl = URL.createObjectURL(file)

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Button onClick={togglePlay} size="lg" className="rounded-full bg-primary hover:bg-primary/90">
              <Play className="h-6 w-6 fill-current" />
            </Button>
          </div>
        )}

        {isPlaying && (
          <Button onClick={togglePlay} size="sm" className="absolute top-4 right-4 bg-black/50 hover:bg-black/70">
            Pause
          </Button>
        )}
      </div>

      <div className="flex gap-2 justify-between">
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold">{file.name}</p>
          <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <Button onClick={toggleMute} variant="outline" size="sm">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
