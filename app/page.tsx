"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Zap, Eye, Type } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import VideoUploadForm from "@/components/video-upload-form"
import VideoPreview from "@/components/video-preview"
import ProcessingStatus from "@/components/processing-status"
import ClipsGallery from "@/components/clips-gallery"

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [processingSteps, setProcessingSteps] = useState<
    Array<{ step: string; status: "pending" | "processing" | "complete"; progress?: number }>
  >([])
  const [generatedClips, setGeneratedClips] = useState<
    Array<{
      id: string
      title: string
      thumbnail: string
      videoUrl: string
      startTime: number
      endTime: number
      emotionScore: number
      caption: string
    }>
  >([])
  const [error, setError] = useState<string | null>(null)

  const handleVideoUpload = (file: File) => {
    setUploadedVideo(file)
    setError(null)
    setGeneratedClips([])
  }

  const handleProcessVideo = async () => {
    if (!uploadedVideo) return

    setProcessing(true)
    setError(null)
    setProcessingSteps([
      { step: "Uploading video", status: "processing", progress: 0 },
      { step: "Transcribing audio", status: "pending" },
      { step: "Detecting emotional peaks", status: "pending" },
      { step: "Analyzing sentiment", status: "pending" },
      { step: "Smart-cropping to vertical", status: "pending" },
      { step: "Generating captions", status: "pending" },
      { step: "Rendering clips", status: "pending" },
    ])

    try {
      const formData = new FormData()
      formData.append("video", uploadedVideo)

      const response = await fetch("/api/process-video", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process video")
      }

      const data = await response.json()

      // Simulate processing steps
      const steps = [
        { step: "Uploading video", status: "complete" as const },
        { step: "Transcribing audio", status: "complete" as const },
        { step: "Detecting emotional peaks", status: "complete" as const },
        { step: "Analyzing sentiment", status: "complete" as const },
        { step: "Smart-cropping to vertical", status: "complete" as const },
        { step: "Generating captions", status: "complete" as const },
        { step: "Rendering clips", status: "complete" as const },
      ]
      setProcessingSteps(steps)

      // Mock clips for demo
      setGeneratedClips(
        data.clips || [
          {
            id: "1",
            title: "Emotional Peak #1",
            thumbnail: "/video-thumbnail-1.png",
            videoUrl: "/sample-clip-1.mp4",
            startTime: 120,
            endTime: 180,
            emotionScore: 0.95,
            caption: "The most impactful moment",
          },
          {
            id: "2",
            title: "Key Insight #2",
            thumbnail: "/video-thumbnail-2.png",
            videoUrl: "/sample-clip-2.mp4",
            startTime: 540,
            endTime: 600,
            emotionScore: 0.88,
            caption: "Game-changing wisdom",
          },
          {
            id: "3",
            title: "High Energy Moment #3",
            thumbnail: "/video-thumbnail-3.jpg",
            videoUrl: "/sample-clip-3.mp4",
            startTime: 1200,
            endTime: 1260,
            emotionScore: 0.92,
            caption: "Pure inspiration",
          },
        ],
      )

      setProcessing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while processing the video")
      setProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-2">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">PulsePoint AI</h1>
                <p className="text-sm text-muted-foreground">Extract viral moments from long-form videos</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>Start with your long-form content</CardDescription>
              </CardHeader>
              <CardContent>
                <VideoUploadForm onUpload={handleVideoUpload} disabled={processing} />
              </CardContent>
            </Card>
          </div>

          {/* Preview & Status Section */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {uploadedVideo && !generatedClips.length && (
              <Card>
                <CardHeader>
                  <CardTitle>Video Preview</CardTitle>
                  <CardDescription>{uploadedVideo.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoPreview file={uploadedVideo} />
                  <Button
                    onClick={handleProcessVideo}
                    disabled={processing}
                    className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    size="lg"
                  >
                    {processing ? (
                      <>
                        <span className="animate-spin mr-2">⚡</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Extract Viral Clips
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {processing && <ProcessingStatus steps={processingSteps} />}

            {generatedClips.length > 0 && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Generated Clips ({generatedClips.length})
                    </CardTitle>
                    <CardDescription>
                      Your high-impact moments are ready. Download for TikTok, Instagram Reels, or YouTube Shorts.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <ClipsGallery clips={generatedClips} />
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        {!uploadedVideo && (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Card className="border border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Emotional Peaks</h3>
                  <p className="text-sm text-muted-foreground">
                    AI detects high-energy moments using audio analysis and sentiment detection
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-3">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Smart Cropping</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically converts horizontal video to vertical (9:16) format with face tracking
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-3">
                    <Type className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Dynamic Captions</h3>
                  <p className="text-sm text-muted-foreground">
                    Creates high-contrast, timed captions with catchy hooks to stop the scroll
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
