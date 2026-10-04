import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LedgerEntry } from "..";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { badgeStatusVariant, formatCurrency } from "../helpers";
import CreateRazorpayOrder from "@/modules/payments/components/create-razorpay-order";
import { Button } from "@/components/ui/button";

export default function PaymentCard({
  entry,
  onSuccess,
  canPay = false,
}: {
  entry: LedgerEntry;
  onSuccess: () => void;
  canPay: boolean
}) {
  const currency = entry.finance?.currency ?? "INR";
  const amount = entry.finance?.totalAmount;
  const status = entry.status;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Amount due</p>
          <p className="text-2xl font-semibold tracking-tight tabular-nums">
            {formatCurrency(amount, currency)}
          </p>
          <p className="text-xs text-muted-foreground">
            via {entry.finance?.paymentGateway ?? "—"}
          </p>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={badgeStatusVariant(status)}>{status ?? "—"}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Currency</span>
            <span className="font-medium">{currency}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Billing</span>
            <span className="font-medium">
              {entry.period?.billingCycle ?? "—"}
            </span>
          </div>
        </div>

        {canPay ? (
          <CreateRazorpayOrder options={{}} onSuccess={onSuccess} />
        ) : (
          <Button className="w-full">
            {entry.isDeleted
              ? "Deleted"
              : status === "Cleared"
                ? "Already paid"
                : "Not Paid"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}