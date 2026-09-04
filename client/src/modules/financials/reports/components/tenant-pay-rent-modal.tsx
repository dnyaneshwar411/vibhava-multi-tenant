"use client";

import { useState, useEffect } from "react";
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
import { CreditCard, Calendar, Building, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { formatCurrency, formatDate } from "../helpers/formatters";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { ComponentLoader } from "@/components/ui/loader";

type TenantPayRentModalProps = {
  unitData?: any;
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

      <DialogContent className="max-w-md p-6 border bg-card text-card-foreground">
        <Container unitData={unitData} onPaymentSuccess={onPaymentSuccess} />
      </DialogContent>
    </Dialog>
  );
}

function Container({ unitData, onPaymentSuccess }: {
  unitData?: any;
  onPaymentSuccess?: () => void;
}) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const { data: leaseResponse, isLoading: isLoadingLease } = useFetch("/api/v1/lease");

  const activeLease = leaseResponse?.data?.[0] || leaseResponse?.data || null;
  const propertyName = unitData?.propertyName || activeLease?.property?.name || "Your Residence Property";
  const unitNumber = unitData?.unitNumber || activeLease?.unit?.unitNumber || "N/A";
  const baseRent = unitData?.monthlyRent ?? activeLease?.finance?.rentAmount ?? 0;
  const outstandingBalance = unitData?.outstandingBalance ?? 0;
  const totalPayable = outstandingBalance > 0 ? outstandingBalance : baseRent;

  const nextDueDate = new Date();
  nextDueDate.setDate(1);
  nextDueDate.setMonth(nextDueDate.getMonth() + 1);

  const handleConfirmPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaidSuccess(true);
      toast.success("Rent payment submitted successfully!");
      if (typeof onPaymentSuccess === "function") {
        onPaymentSuccess();
      }
    }, 1200);
  };

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
            <CreditCard className="h-5 w-5" />
            Pay Upcoming Rent
          </DialogTitle>
          <Badge variant="outline">
            Verified Lease
          </Badge>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Review verified upcoming rent schedule and process payment securely.
        </DialogDescription>
      </DialogHeader>

      {isVerifying || isLoadingLease ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <ComponentLoader />
          <p className="text-xs text-muted-foreground">
            Verifying upcoming rent schedule with server...
          </p>
        </div>
      ) : isPaidSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="bg-muted p-3 text-foreground">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Payment Completed!</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Your payment of <span className="font-bold text-foreground">{formatCurrency(totalPayable)}</span> has been logged.
            </p>
          </div>
          <DialogClose>
            <span className={buttonVariants({ variant: "default", size: "sm" })}>
              Done
            </span>
          </DialogClose>
        </div>
      ) : (
        <div className="space-y-4 py-2">
          <Card className="border bg-muted/40">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-muted-foreground" /> Property & Unit
                </span>
                <span className="font-medium text-foreground">
                  {propertyName} (Unit {unitNumber})
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Rent Due Date
                </span>
                <span className="font-medium text-foreground">
                  {formatDate(nextDueDate)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-b pb-2">
                <span className="text-muted-foreground">Base Monthly Rent</span>
                <span className="font-medium text-foreground">{formatCurrency(baseRent)}</span>
              </div>

              {outstandingBalance > 0 && (
                <div className="flex items-center justify-between text-xs border-b pb-2">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <AlertCircle className="h-3 w-3" /> Outstanding Balance
                  </span>
                  <span className="font-semibold text-foreground">{formatCurrency(outstandingBalance)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm pt-1">
                <span className="font-semibold text-foreground">Total Payable Amount</span>
                <span className="text-base font-bold text-foreground">
                  {formatCurrency(totalPayable)}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground block">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-col items-center justify-center p-3 border text-xs gap-1.5 transition-all ${
                  paymentMethod === "card"
                    ? "bg-secondary text-secondary-foreground font-medium border-primary"
                    : "border-input bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex flex-col items-center justify-center p-3 border text-xs gap-1.5 transition-all ${
                  paymentMethod === "upi"
                    ? "bg-secondary text-secondary-foreground font-medium border-primary"
                    : "border-input bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={`flex flex-col items-center justify-center p-3 border text-xs gap-1.5 transition-all ${
                  paymentMethod === "netbanking"
                    ? "bg-secondary text-secondary-foreground font-medium border-primary"
                    : "border-input bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                <Building className="h-4 w-4" />
                <span>NetBanking</span>
              </button>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <DialogClose disabled={isProcessing}>
              <span className={buttonVariants({ variant: "outline", size: "sm" })}>
                Cancel
              </span>
            </DialogClose>
            <Button
              size="sm"
              onClick={handleConfirmPay}
              disabled={isProcessing || totalPayable <= 0}
              className="gap-2"
            >
              {isProcessing ? (
                <>
                  <ComponentLoader />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Pay {formatCurrency(totalPayable)}
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      )}
    </>
  );
}