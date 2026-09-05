"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Calendar,
  Building,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Loader,
} from "lucide-react";
import { formatCurrency, formatDate } from "../helpers/formatters";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { ComponentLoader } from "@/components/ui/loader";
import CreateRazorpayOrder from "@/modules/payments/components/create-razorpay-order";
import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";
import { copyText } from "@/lib/helpers";
import { format } from "date-fns";
import CreateStripeOrder from "@/modules/payments/components/create-stripe-order";

type RentDetails = {
  rentAmount: number;
  dueDate: string;
  propertyName: string;
  unitNumber: string;
  gateway: string[];
};

type TenantPayRentModalProps = {
  unitData?: { unitId: string | number };
  onPaymentSuccess?: () => void;
};

export default function TenantPayRentModal({ unitData, onPaymentSuccess }: TenantPayRentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default", size: "sm" })}>
          <CreditCard className="h-4 w-4 mr-1.5" />
          <span>Pay Rent</span>
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto p-6 border bg-card text-card-foreground">
        {isOpen && <RentPaymentContainer unitData={unitData} onPaymentSuccess={onPaymentSuccess} />}
      </DialogContent>
    </Dialog>
  );
}

function RentPaymentContainer({ unitData, onPaymentSuccess }: TenantPayRentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<string>("");

  const { data, isLoading, error } = useFetch(`/api/v1/reports/rent-roll/${unitData?.unitId}/pay`);

  if (isLoading) {
    return <ComponentLoader />
  }

  if (error || data.code !== 200) {
    return <ErrorState />
  }

  const rentDetails: RentDetails | undefined = data?.data?.rentDetails;
  const gateways = Array.isArray(data?.data.gateway) ? data?.data.gateway : [];

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
            <CreditCard className="h-5 w-5" />
            Pay Upcoming Rent
          </DialogTitle>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Review upcoming rent schedule and choose a payment method.
        </DialogDescription>
      </DialogHeader>

      <PaymentDetailsForm
        rentDetails={rentDetails!}
        gateways={gateways}
        selectedGateway={selectedGateway}
        onSelectGateway={setSelectedGateway}
        onPay={Function}
        isProcessing={isProcessing}
      />
    </>
  );
}

function ErrorState() {
  return (
    <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <p className="text-sm font-medium text-destructive">Failed to load payment details</p>
      <p className="text-xs text-muted-foreground">Please try again later or contact support.</p>
    </div>
  );
}

function GatewaySelector({
  gateways,
  selectedGateway,
  onSelectGateway,
  disabled,
}: {
  gateways: string[];
  selectedGateway: string;
  onSelectGateway: (gateway: string) => void;
  disabled: boolean;
}) {
  if (!gateways || gateways.length === 0) {
    return (
      <div className="p-3 border bg-amber-500/10 text-amber-600 text-xs flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>No payment gateways are currently available for this property.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold text-foreground">
        Select Payment Method
      </Label>
      <RadioGroup
        value={selectedGateway}
        onValueChange={onSelectGateway}
        disabled={disabled}
        className="grid gap-2"
      >
        {gateways.map((gw) => {
          const formattedName = formatGatewayName(gw);
          const isSelected = selectedGateway === gw;
          return (
            <Label
              key={gw}
              htmlFor={`gateway-${gw}`}
              className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${isSelected
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50 border-border"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center gap-2.5">
                <RadioGroupItem value={gw} id={`gateway-${gw}`} />
                <span className="text-xs font-medium text-foreground">
                  {formattedName}
                </span>
              </div>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}

function formatGatewayName(gatewayKey: string): string {
  switch (gatewayKey?.toUpperCase()) {
    case "STRIPE":
      return "Stripe";
    case "RAZORPAY":
      return "Razorpay";
    default:
      return gatewayKey || "Unknown Gateway";
  }
}

function PaymentDetailsForm({
  rentDetails,
  gateways,
  selectedGateway,
  onSelectGateway,
  onPay,
  isProcessing,
}: {
  rentDetails: any;
  gateways: string[];
  selectedGateway: string;
  onSelectGateway: (gateway: string) => void;
  onPay: () => void;
  isProcessing: boolean;
}) {
  return (
    <div className="space-y-4 py-2">
      <div className="rounded-xl border bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Due
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mt-0.5">
              {formatCurrency(rentDetails?.rentAmount ?? 0)}
            </h3>
          </div>
          <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium rounded-md">
            Due {rentDetails?.nextDueDate ? formatDate(new Date(rentDetails.nextDueDate)) : "N/A"}
          </Badge>
        </div>

        <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            Rent Cycle
          </span>
          <span className="font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded text-[11px]">
            {rentDetails?.startDate ? formatDate(new Date(rentDetails.nextDueDate)) : "N/A"} - {formatDate(new Date(rentDetails.nextCycleEndDate))}
          </span>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Building className="h-3.5 w-3.5 text-muted-foreground" />
            {rentDetails?.property?.name || "N/A"}
          </span>
          <span className="bg-background px-2 py-0.5 rounded border text-[11px] font-semibold text-foreground">
            Unit {rentDetails?.unit?.unitNumber || "N/A"} • {rentDetails?.unit?.unitType || "N/A"}
          </span>
        </div>
      </div>

      <Card className="border bg-card shadow-none">
        <CardContent className="p-3.5 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Primary Tenant</span>
            <div className="text-right">
              <span className="font-medium text-foreground block">
                {rentDetails?.primaryTenant?.name || "N/A"}
              </span>
              <span className="text-[11px] text-muted-foreground block">
                {rentDetails?.primaryTenant?.email}
              </span>
            </div>
          </div>

          {rentDetails?.coTenants?.length > 0 && (
            <div className="flex items-start justify-between pt-2 border-t border-border/40">
              <span className="text-muted-foreground">Co-Tenants</span>
              <div className="text-right space-y-0.5">
                {rentDetails.coTenants.map((ct: any) => (
                  <span key={ct._id} className="font-medium text-foreground block text-[11px]">
                    {ct.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <span className="text-muted-foreground">Lease Period</span>
            <span className="font-medium text-foreground">
              {rentDetails?.leaseType || "N/A"} (
              {rentDetails?.startDate ? formatDate(new Date(rentDetails.startDate)) : "N/A"} -{" "}
              {rentDetails?.endDate ? formatDate(new Date(rentDetails.endDate)) : "N/A"})
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <span className="text-muted-foreground">Billing Schedule</span>
            <span className="font-medium text-foreground">
              {rentDetails?.billingCycle || "N/A"} (Due Day {rentDetails?.paymentDueDay ?? "N/A"})
            </span>
          </div>
        </CardContent>
      </Card>

      <GatewaySelector
        gateways={gateways}
        selectedGateway={selectedGateway}
        onSelectGateway={onSelectGateway}
        disabled={isProcessing}
      />

      <DialogFooter className="pt-2">
        <DialogClose disabled={isProcessing}>
          <span className={buttonVariants({ variant: "outline", size: "sm" })}>
            Cancel
          </span>
        </DialogClose>
        <PaymentGateway
          gateway={selectedGateway}
          rentDetails={rentDetails}
          isProcessing={isProcessing}
        />
      </DialogFooter>
    </div>
  );
}

function PaymentGateway({
  isProcessing,
  rentDetails,
  gateway
}: {
  gateway: string
  rentDetails: any
  isProcessing: boolean
}) {

  if (isProcessing) return <>
    <ComponentLoader />
    Processing...
  </>

  if (gateway === "RAZORPAY") {
    return <RazorpayOrder rentDetails={rentDetails} />
  }

  if (gateway === "STRIPE") {
    return <StripeOrder rentDetails={rentDetails} />
  }

  return null
}

function RazorpayOrder({ rentDetails }: { rentDetails: any }) {
  const [order, setOrder] = useState({});
  const [processing, setProcessing] = useState(false);

  const createOrder = async function () {
    try {
      setProcessing(true)
      const response = await api.post(`/api/v1/reports/rent-roll/${rentDetails.unit._id}/pay/order`, {
        body: {
          gateway: "RAZORPAY",
          startDate: format(rentDetails.nextDueDate, "yyyy-MM-dd")
        }
      })
      if (response.code !== 200) throw new Error(response.message)
      toast.success(response.message || "Loading Razorpay Modal")
      setOrder(response.order)
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
    setProcessing(false)
  }

  return (
    <div>
      <Button
        size="sm"
        onClick={createOrder}
        disabled={processing}
        className="gap-2"
      >
        {processing ? <Loader className="animate-spin" /> : <>Pay {formatCurrency(rentDetails?.rentAmount)} via Razorpay</>}
      </Button>
      <CreateRazorpayOrder
        options={order}
        onSuccess={Function}
        triggerOnLoad={true}
      />
    </div>
  )
}

function StripeOrder({ rentDetails }: { rentDetails: any }) {
  const [order, setOrder] = useState({
    clientSecret: "",
    stripeKeyId: ""
  });
  const [processing, setProcessing] = useState(false);

  const createOrder = async function () {
    try {
      setProcessing(true)
      const response = await api.post(`/api/v1/reports/rent-roll/${rentDetails.unit._id}/pay/order`, {
        body: {
          gateway: "STRIPE",
          startDate: format(rentDetails.nextDueDate, "yyyy-MM-dd")
        }
      })
      if (response.code !== 200) throw new Error(response.message)
      toast.success(response.message || "Loading Stripe Modal")
      setOrder({
        clientSecret: response.order.clientSecret,
        stripeKeyId: response.credentials!
      })
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
    setProcessing(false)
  }

  return (
    <div>
      <Button
        size="sm"
        onClick={createOrder}
        disabled={processing}
        className="gap-2"
      >
        {processing ? <Loader className="animate-spin" /> : <>Pay {formatCurrency(rentDetails?.rentAmount)} via Stripe</>}
      </Button>
      <CreateStripeOrder
        order={order}
        onSuccess={Function}
        triggerOnLoad
      />
    </div>
  )
}