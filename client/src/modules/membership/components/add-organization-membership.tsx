"use client"
import { useState } from "react"
import { Check, ShieldAlert, Sparkles, Building, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants, Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MEMBERSHIP_BILLING_CYCLES, MEMBERSHIP_TIER, TIER_DETAILS } from "../config"
import { BillingCycle, Tier } from "../types"
import api from "@/network/client"
import { toast } from "sonner"
import { buildToastMessage } from "@/lib/catchAsync"
import CreateRazorpayOrder from "@/modules/payments/components/create-razorpay-order"

export default function AddOrganizationMembership() {
  const [open, setOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<Tier>("Starter");
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>("Monthly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayOrder, setRazorpayOrder] = useState({})

  const handleSubmit = async function () {
    try {
      setIsSubmitting(true)
      const payload = {
        tier: selectedTier,
        billingCycle: selectedCycle,
      }

      const response = await api.post("/api/v1/memberships", {
        body: {
          tier: selectedTier,
          duration: selectedCycle
        }
      })

      if (![200, 201].includes(response.code)) {
        throw new Error(response.message)
      }

      setRazorpayOrder(response.order)
      setIsSubmitting(false)
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className={cn(buttonVariants(), "rounded-none cursor-pointer")}>
          Add Membership
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-none p-6 shadow-none sm:max-w-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold">
            Add Organization Membership
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Configure your workspace plan tier and renewal billing cycle.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-3">
            <label className="text-xs mb-2 block font-semibold uppercase tracking-wider text-muted-foreground">
              1. Select Tier
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {MEMBERSHIP_TIER.map((tier) => {
                const Icon = TIER_DETAILS[tier].icon
                const isSelected = selectedTier === tier

                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={cn(
                      "relative flex flex-col justify-between border p-4 text-left transition-all rounded-none",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-background hover:bg-muted/30"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            isSelected ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        {isSelected && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{tier}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {TIER_DETAILS[tier].description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs mb-2 block font-semibold uppercase tracking-wider text-muted-foreground">
              2. Select Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              {MEMBERSHIP_BILLING_CYCLES.map((cycle) => {
                const isSelected = selectedCycle === cycle

                return (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setSelectedCycle(cycle)}
                    className={cn(
                      "relative flex items-center justify-between border p-4 text-left transition-all rounded-none",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-background hover:bg-muted/30"
                    )}
                  >
                    <div>
                      <p className="font-semibold text-sm">{cycle}</p>
                      <p className="text-xs text-muted-foreground">
                        {cycle === "Annually"
                          ? "Billed every 12 months"
                          : "Billed on a monthly basis"}
                      </p>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </button>
                )
              })}
            </div>
          </div>

          <Alert className="rounded-none border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-200">
            <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-xs">
              If your organization has an active membership, the new plan will take effect automatically after the current billing cycle expires.
            </AlertDescription>
          </Alert>
        </div>

        <CreateRazorpayOrder options={razorpayOrder} />

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-none shadow-none min-w-[140px]"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="rounded-none shadow-none min-w-[140px]"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Processing..." : "Confirm Membership"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}