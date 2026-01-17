"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Loader } from "lucide-react"

interface ProcessingStep {
  step: string
  status: "pending" | "processing" | "complete"
  progress?: number
}

interface ProcessingStatusProps {
  steps: ProcessingStep[]
}

export default function ProcessingStatus({ steps }: ProcessingStatusProps) {
  const completedSteps = steps.filter((s) => s.status === "complete").length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Your Video</CardTitle>
        <CardDescription>
          Step {completedSteps + 1} of {steps.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium">Overall Progress</span>
            <span className="text-muted-foreground">{Math.round((completedSteps / steps.length) * 100)}%</span>
          </div>
          <Progress value={(completedSteps / steps.length) * 100} className="h-2" />
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              {step.status === "complete" ? (
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              ) : step.status === "processing" ? (
                <Loader className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 animate-spin" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    step.status === "complete"
                      ? "text-foreground"
                      : step.status === "processing"
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.step}
                </p>
                {step.status === "processing" && step.progress !== undefined && (
                  <Progress value={step.progress} className="h-1 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
