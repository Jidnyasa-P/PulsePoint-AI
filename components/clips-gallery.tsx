"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Play, Star } from "lucide-react"
import ClipDetailsModal from "@/components/clip-details-modal"

interface Clip {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
  startTime: number
  endTime: number
  emotionScore: number
  caption: string
}

interface ClipsGalleryProps {
  clips: Clip[]
}

export default function ClipsGallery({ clips }: ClipsGalleryProps) {
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clips.map((clip) => (
          <Card key={clip.id} className="overflow-hidden hover:border-primary/50 transition group cursor-pointer">
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={clip.thumbnail || "/placeholder.svg"}
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                <Button
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90"
                  onClick={() => setSelectedClip(clip)}
                >
                  <Play className="h-6 w-6 fill-current" />
                </Button>
              </div>

              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded text-xs text-yellow-400">
                <Star className="h-3 w-3 fill-current" />
                {(clip.emotionScore * 100).toFixed(0)}
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{clip.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">"{clip.caption}"</p>

              <div className="flex gap-2 text-xs text-muted-foreground mb-3">
                <span>{Math.floor((clip.endTime - clip.startTime) / 60)}s clip</span>
                <span>•</span>
                <span>@{Math.floor(clip.startTime / 60)}m</span>
              </div>

              <Button
                onClick={() => {
                  const a = document.createElement("a")
                  a.href = clip.videoUrl
                  a.download = `${clip.title.replace(/\s+/g, "-").toLowerCase()}.mp4`
                  a.click()
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedClip && <ClipDetailsModal clip={selectedClip} onClose={() => setSelectedClip(null)} />}
    </>
  )
}
