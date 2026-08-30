"use client"
import { useState } from "react"
import {
  Copy,
  Check,
  Eye,
  EyeOff,
  CreditCard,
  Layers,
  ShieldAlertIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/ui/error"
import { ComponentLoader } from "@/components/ui/loader"
import { Badge } from "@/components/ui/badge"
import useFetch from "@/hooks/useFetch"
import { copyText } from "@/lib/helpers"
import AddPaymentGateway from "@/modules/payment-gateway/components/add-payment-gateway"
import UpdatePaymentGateway from "@/modules/payment-gateway/components/update-payment-gateway"
import DeletePaymentGateway from "@/modules/payment-gateway/components/delete-payment-gateway"

export default function PaymentGatewayPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})

  const { isLoading, data, error, mutate } = useFetch(
    "/api/v1/payment-gateway"
  )

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center">
        <ComponentLoader />
      </div>
    )
  }

  if (error || data?.code !== 200 || !data?.data) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }

  const gateways = data.data

  const handleCopyValue = (val: string, keyIdentifier: string) => {
    copyText(val)
    setCopiedField(keyIdentifier)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const maskSecret = (secret?: string) => {
    if (!secret) return "—"
    if (secret.length <= 8) return "••••••••"
    return `${secret.slice(0, 4)}••••••••${secret.slice(-4)}`
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Payment Gateways</h1>
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              INTEGRATIONS
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure third-party payment provider credentials, secret keys, and webhook signatures.
          </p>
        </div>
        <AddPaymentGateway />
      </div>

      <div className="grid grid-cols-1 gap-0 border-t border-l md:grid-cols-3">
        <div className="bg-card/70 border-r border-b p-6 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Providers</span>
            <CreditCard className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{gateways.length}</div>
          <p className="text-xs text-muted-foreground">Configured checkout channels</p>
        </div>

        <div className="bg-card/70 border-r border-b p-6 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Security Engine</span>
            <ShieldAlertIcon className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">Encrypted</div>
          <p className="text-xs text-muted-foreground">Keys stored at rest</p>
        </div>

        <div className="bg-card/70 border-r border-b p-6 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">Supported Types</span>
            <Layers className="h-4 w-4" />
          </div>
          <div className="flex gap-2 pt-1">
            {gateways.map((g: any) => (
              <Badge key={g._id} variant="secondary" className="rounded-none font-mono text-xs">
                {g.type}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Active payment handlers</p>
        </div>
      </div>

      {gateways.length === 0 && (
        <div className="flex flex-col items-center justify-center border border-dashed bg-card/40 p-12 text-center space-y-4 rounded-none">
          <div className="flex h-12 w-12 items-center justify-center border bg-muted/40 rounded-none">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-lg font-bold tracking-tight">No payment gateway configured</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connect Razorpay or Stripe credentials to enable automated billing and checkout operations.
            </p>
          </div>
          <div className="pt-2">
            <AddPaymentGateway />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {gateways.map((gateway: any) => {
          const isVisible = !!visibleKeys[gateway._id]
          const isRazorpay = gateway.type === "RAZORPAY"
          const keyId = isRazorpay
            ? gateway.credentials.razorpayKeyId
            : gateway.credentials.stripeKeyId
          const secret = isRazorpay
            ? gateway.credentials.razorpayKeySecret
            : gateway.credentials.stripeSignature
          const extraSig = isRazorpay ? gateway.credentials.razorpaySignature : null

          return (
            <div key={gateway._id} className="bg-card/70 border p-6 space-y-6">
              <div className="flex items-center justify-between gap-2 border-b pb-4">
                <div className="space-y-1 mr-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{gateway.type}</span>
                    <Badge variant="default" className="rounded-none text-[10px]">
                      ENABLED
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none text-xs"
                  onClick={() => toggleVisibility(gateway._id)}
                >
                  {isVisible ? (
                    <>
                      <EyeOff className="mr-2 h-3.5 w-3.5" /> Hide Keys
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-3.5 w-3.5" /> Reveal Keys
                    </>
                  )}
                </Button>
                <UpdatePaymentGateway gateway={gateway} />
                <DeletePaymentGateway gatewayType={gateway.type} />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {isRazorpay ? "Razorpay Key ID" : "Stripe Key ID"}
                  </span>
                  <div className="flex items-center justify-between border p-2.5 bg-muted/20">
                    <span className="font-mono text-xs truncate">
                      {isVisible ? keyId : maskSecret(keyId)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-none"
                      onClick={() => keyId && handleCopyValue(keyId, `${gateway._id}-key`)}
                    >
                      {copiedField === `${gateway._id}-key` ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {isRazorpay ? "Razorpay Key Secret" : "Stripe Webhook Signature"}
                  </span>
                  <div className="flex items-center justify-between border p-2.5 bg-muted/20">
                    <span className="font-mono text-xs truncate">
                      {isVisible ? secret : maskSecret(secret)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-none"
                      onClick={() => secret && handleCopyValue(secret, `${gateway._id}-secret`)}
                    >
                      {copiedField === `${gateway._id}-secret` ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {extraSig && (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Razorpay Signature
                    </span>
                    <div className="flex items-center justify-between border p-2.5 bg-muted/20">
                      <span className="font-mono text-xs truncate">
                        {isVisible ? extraSig : maskSecret(extraSig)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-none"
                        onClick={() => handleCopyValue(extraSig, `${gateway._id}-sig`)}
                      >
                        {copiedField === `${gateway._id}-sig` ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}