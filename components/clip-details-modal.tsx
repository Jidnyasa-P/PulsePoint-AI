"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Download, Copy, CheckCircle } from "lucide-react"

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

interface ClipDetailsModalProps {
  clip: Clip
  onClose: () => void
}

export default function ClipDetailsModal({ clip, onClose }: ClipDetailsModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(clip.caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="sticky top-0 bg-card border-b border-border flex flex-row items-center justify-between">
          <CardTitle>{clip.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Video Player */}
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
            <video ref={videoRef} src={clip.videoUrl} controls className="w-full h-full" autoPlay />
          </div>

          {/* Clip Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Duration</p>
              <p className="text-lg font-semibold">{clip.endTime - clip.startTime}s</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Emotion Score</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${clip.emotionScore * 100}%` }}
                  />
                </div>
                <p className="text-lg font-semibold">{(clip.emotionScore * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Caption</p>
              <div className="bg-card border border-border rounded-lg p-3 flex justify-between items-start gap-2">
                <p className="text-sm italic">"{clip.caption}"</p>
                <Button variant="ghost" size="sm" onClick={handleCopyCaption} className="flex-shrink-0">
                  {copied ? <CheckCircle className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Start Time</p>
              <p className="text-sm text-foreground">
                {Math.floor(clip.startTime / 60)}:{String(clip.startTime % 60).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button
              onClick={() => {
                const a = document.createElement("a")
                a.href = clip.videoUrl
                a.download = `${clip.title.replace(/\s+/g, "-").toLowerCase()}.mp4`
                a.click()
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Clip
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
