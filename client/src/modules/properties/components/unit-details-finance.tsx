"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";

export default function UnitDetailsFinance({ finance }: { finance: any }) {
  const currencySymbol = finance.currency === "INR" ? "₹" : finance.currency;

  const rentDiff = finance.currentRent - finance.marketRent;
  const rentDiffPercentage = (
    (Math.abs(rentDiff) / finance.marketRent) *
    100
  ).toFixed(1);

  const isAboveMarket = rentDiff > 0;
  const isBelowMarket = rentDiff < 0;

  return (
    <TabsContent
      value="finance"
      className="m-0 focus-visible:outline-none space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border bg-card/50 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Current Rent
            </h3>
            <CreditCard className="h-4 w-4 text-muted-foreground/60" />
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">
              {currencySymbol}
              {finance.currentRent.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                / mo
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Active tenant lease agreement rate
            </p>
          </div>

          <div className="pt-3 border-t flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Variance</span>
            {isAboveMarket && (
              <Badge
                variant="secondary"
                className="gap-1 font-mono text-[11px] text-emerald-600 bg-emerald-500/10 rounded-none border-0"
              >
                <TrendingUp className="h-3 w-3" />+{rentDiffPercentage}% vs
                market
              </Badge>
            )}
            {isBelowMarket && (
              <Badge
                variant="secondary"
                className="gap-1 font-mono text-[11px] text-amber-600 bg-amber-500/10 rounded-none border-0"
              >
                <TrendingDown className="h-3 w-3" />-{rentDiffPercentage}% vs
                market
              </Badge>
            )}
            {!isAboveMarket && !isBelowMarket && (
              <Badge
                variant="secondary"
                className="font-mono text-[11px] rounded-none border-0"
              >
                At Market Value
              </Badge>
            )}
          </div>
        </div>

        <div className="border bg-card/50 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Market Rent
            </h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/60" />
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">
              {currencySymbol}
              {finance.marketRent.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                / mo
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Target valuation based on location & size
            </p>
          </div>

          <div className="pt-3 border-t flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Rent Difference</span>
            <span
              className={`font-mono font-medium ${
                isAboveMarket
                  ? "text-emerald-600"
                  : isBelowMarket
                  ? "text-amber-600"
                  : "text-muted-foreground"
              }`}
            >
              {isAboveMarket ? "+" : ""}
              {currencySymbol}
              {rentDiff.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="border bg-card/50 p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Security Deposit
            </h3>
            <ShieldCheck className="h-4 w-4 text-muted-foreground/60" />
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">
              {currencySymbol}
              {finance.securityDeposit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total escrow security balance on file
            </p>
          </div>

          <div className="pt-3 border-t flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Coverage</span>
            <span className="font-mono font-medium">
              {(finance.securityDeposit / finance.currentRent).toFixed(1)}x
              Monthly Rent
            </span>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}