"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Download,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
} from "lucide-react";

import { ComponentLoader } from "@/components/ui/loader";
import { ErrorState } from "@/components/ui/error";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";
import useFetch from "@/hooks/useFetch";
import useRevalidate from "@/hooks/useRevalidate";

import { LedgerEntry, Party } from "@/modules/ledger";
import PaymentCard from "@/modules/ledger/components/ledger-payment-card";
import { badgeStatusVariant, formatCurrency } from "@/modules/ledger/helpers";
import CreateRazorpayOrder from "@/modules/payments/components/create-razorpay-order";
import { useGlobalStore } from "@/providers/store-provider";

const formatPhone = (cc?: number | string, mobile?: number | string) =>
  mobile ? `+${cc ?? ""} ${mobile}`.trim() : undefined;

const getInitials = (name?: string) =>
  name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "?";

export default function LedgerDetailPage() {
  const { ledgerId } = useParams();
  const router = useRouter();
  const { actorModel } = useGlobalStore(state => state)

  const { isLoading, data, error, mutate } = useFetch(
    `/api/v1/ledger/entries/${ledgerId}`
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200 || !data?.data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorState
          title={data?.message ?? "Failed to load ledger entry"}
          description="The entry may have been deleted or the server is unreachable."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const entry = data.data;
  const currency = entry.finance?.currency ?? "INR";
  const amount = entry.finance?.totalAmount;
  const canPay = actorModel === "Tenant" && data?.data?.status !== "Cleared";
  console.log(data?.data?.status)

  return (
    <div className="container mx-auto max-w-6xl space-y-6 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {entry.entryType ?? "Ledger Entry"}
            </h1>
            {entry.status && (
              <Badge variant={badgeStatusVariant(entry.status)}>
                {entry.status}
              </Badge>
            )}
            {entry.isDeleted && <Badge variant="destructive">Deleted</Badge>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Back
          </Button>
          {/* <Button variant="outline" size="sm">
            <Download />
            Download Invoice
          </Button> */}
          {/* <Button variant="outline" size="sm">
            <Pencil />
            Edit
          </Button> */}
          {canPay && <PayButton entry={entry} onSuccess={() => mutate()} />}
        </div>
      </div>

      <Card>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="space-y-1 md:col-span-2">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-4xl font-semibold tracking-tight tabular-nums">
              {formatCurrency(amount, currency)}
            </p>
            <p className="text-sm text-muted-foreground">
              {currency} · {entry.finance?.paymentGateway ?? "—"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Billing Cycle</p>
              <p className="text-sm font-medium">
                {entry.period?.billingCycle ?? "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Created By</p>
              <p className="truncate font-mono text-xs font-medium">
                {entry.createdBy ?? "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Property & Unit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {entry.property?.name ?? "—"}
                    </p>
                    {entry.property?.status && (
                      <Badge variant={badgeStatusVariant(entry.property.status)}>
                        {entry.property.status}
                      </Badge>
                    )}
                  </div>
                  {entry.property?.propertyType && (
                    <p className="text-sm text-muted-foreground">
                      {entry.property.propertyType}
                    </p>
                  )}
                  {entry.property?.address && (
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0" />
                      <span>
                        {[
                          entry.property.address.street1,
                          entry.property.address.city,
                          entry.property.address.state,
                          entry.property.address.zipCode,
                          entry.property.address.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {entry.unit?.unitNumber ?? "—"}
                    </p>
                    {entry.unit?.status && (
                      <Badge variant={badgeStatusVariant(entry.unit.status)}>
                        {entry.unit.status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {entry.unit?.floor !== undefined && (
                      <span>Floor {entry.unit.floor}</span>
                    )}
                    {entry.unit?.unitType && <span>{entry.unit.unitType}</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Line Items</CardTitle>
            </CardHeader>
            <CardContent>
              {entry.lines?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entry.lines.map((line: any, i: any) => (
                      <TableRow key={line._id ?? i}>
                        <TableCell>
                          <div className="font-medium">
                            {line.accountName ?? "—"}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {line.accountId ?? "—"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              line.type === "DEBIT"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {line.type ?? "—"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {line.description ?? "—"}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(line.amount, currency)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No line items
                </p>
              )}
            </CardContent>
          </Card>

          {entry.memo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Memo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {entry.memo}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <PaymentCard
            entry={entry}
            onSuccess={() => mutate()}
            canPay={canPay}
          />
          <PartyCard title="Tenant" party={entry.tenant} />
          <PartyCard title="Vendor" party={entry.vendor} />
        </div>
      </div>
    </div>
  );
}

function PartyCard({ title, party }: { title: string; party?: Party }) {
  if (!party) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic text-muted-foreground">
            Not associated
          </p>
        </CardContent>
      </Card>
    );
  }

  const phone = formatPhone(party.countryCode, party.mobileNumber);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(party.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium">{party.name ?? "—"}</p>
            {party._id && (
              <p className="truncate font-mono text-xs text-muted-foreground">
                {party._id}
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          {phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4 text-muted-foreground" />
              <span>{phone}</span>
            </div>
          )}
          {party.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              <span className="truncate">{party.email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function PayButton({
  entry,
  onSuccess,
}: {
  entry: LedgerEntry;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { update } = useRevalidate({ groupedInstant: ["/api/v1/ledger"] });
  const [order, setOrder] = useState<any>({});

  const amount = entry.finance?.totalAmount;
  const currency = entry.finance?.currency ?? "INR";

  const handlePay = async () => {
    try {
      setSubmitting(true);
      const response = await api.post(
        `/api/v1/ledger/entries/${entry._id}/pay`,
        {
          body: {
            paymentGateway: entry.finance?.paymentGateway,
            amount,
            currency,
          } as any,
        }
      );
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message || "Payment initiated");
      setOrder({
        ...response?.order || {},
        ...response?.credentials || {}
      })
      update();
      onSuccess();
    } catch (err) {
      toast.error(buildToastMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <CreditCard />
        Pay
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Review the amount before proceeding to the gateway.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Amount due</p>
              <p className="text-3xl font-semibold tracking-tight tabular-nums">
                {formatCurrency(amount, currency)}
              </p>
              <p className="text-sm text-muted-foreground">
                via {entry.finance?.paymentGateway ?? "—"}
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Entry Type</span>
              <span className="font-medium">{entry.entryType ?? "—"}</span>
            </div>
          </div>

          <CreateRazorpayOrder
            options={order}
            triggerOnLoad={true}
            credentials={{
              razorpayKeyId: order.razorpayKeyId
            }}
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button onClick={handlePay} disabled={submitting}>
              {submitting && <Loader2 className="animate-spin" />}
              {submitting ? "Processing…" : "Confirm & Pay"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}