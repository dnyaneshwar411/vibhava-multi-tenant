import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useMultiStepForm } from "../providers/multi-step-form-provider"

export default function ProgressIndicator() {
  const { currentStep, steps, goToStep, currentStepIndex } = useMultiStepForm()

  return (
    <div className="flex items-center w-full justify-center p-4 mb-10">
      <div className="w-full space-y-8">
        <div className="relative flex justify-between">
          {/* Progress Line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200">
            <Button className="h-full bg-black"/>
          </div>
          {/* Steps */}
          {steps.map((step: any) => {
            const isCompleted = currentStepIndex > step.position - 1
            const isCurrent = currentStepIndex === step.position - 1

            return (
              <div key={step.position} className="relative z-10">
                <Button
                  onClick={() => goToStep(step.position)}
                  className={`flex size-14 items-center justify-center rounded-full border-2 ${
                    isCompleted || isCurrent
                      ? 'border-primary bg-black text-white'
                      : 'border-gray-200 bg-white text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
