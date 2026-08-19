"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, Home, Wrench, ShieldCheck, Receipt } from "lucide-react";

interface TenantDashboardProps {
  metrics: {
    lease: {
      property: string;
      unitNumber: string;
      startDate: string;
      endDate: string;
      rentAmount: number;
      paymentDueDay: number;
    } | null;
    outstandingBalance: number;
    recentTransactions: Array<{
      id: string;
      date: string;
      type: string;
      amount: number;
      status: string;
    }>;
    maintenance: {
      open: number;
      inProgress: number;
      completed: number;
      total: number;
    };
  };
}

export function TenantDashboard({ metrics }: TenantDashboardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8 w-full p-6 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Portal</h1>
          <p className="text-muted-foreground">Manage your rent payments and report maintenance issues.</p>
        </div>
        {metrics?.outstandingBalance > 0 && (
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md">
            <CreditCard className="mr-2 h-4 w-4" /> Pay Rent (₹{metrics?.outstandingBalance})
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>My Residence</CardTitle>
              <CardDescription>Details of your active lease agreement</CardDescription>
            </div>
            <Home className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="grid gap-4 mt-2">
            {metrics?.lease ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground block">Property</span>
                    <span className="font-semibold text-sm">{metrics?.lease?.property}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Unit Number</span>
                    <span className="font-semibold text-sm">{metrics?.lease?.unitNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <span className="text-xs text-muted-foreground block">Start Date</span>
                    <span className="text-sm font-medium">{formatDate(metrics?.lease?.startDate)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">End Date</span>
                    <span className="text-sm font-medium">{formatDate(metrics?.lease?.endDate)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <span className="text-xs text-muted-foreground block">Rent Amount</span>
                    <span className="text-lg font-bold text-emerald-600">₹{metrics?.lease?.rentAmount.toLocaleString()}/mo</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Payment Due</span>
                    <span className="text-sm font-medium">Day {metrics?.lease?.paymentDueDay} of every month</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-muted-foreground text-sm py-4">No active lease found. Please contact administration.</div>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Current dues & charges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="py-4 text-center">
              <span className="text-xs text-muted-foreground block uppercase font-semibold">Outstanding</span>
              <span className={`text-4xl font-extrabold ${metrics?.outstandingBalance > 0 ? "text-red-500" : "text-emerald-500"}`}>
                ₹{metrics?.outstandingBalance?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center border-t pt-4">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Payments are secure & encrypted</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>My Work Orders</CardTitle>
            <CardDescription>Tickets reported by you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-2">
                <Wrench className="h-4 w-4 text-amber-500" /> Open Tickets
              </span>
              <Badge variant="destructive">{metrics?.maintenance?.open}</Badge>
            </div>
            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-sm font-medium flex items-center gap-2">
                <Wrench className="h-4 w-4 text-blue-500" /> In Progress
              </span>
              <Badge>{metrics?.maintenance?.inProgress}</Badge>
            </div>
            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-sm font-medium flex items-center gap-2">
                <Wrench className="h-4 w-4 text-emerald-500" /> Completed
              </span>
              <Badge variant="link">{metrics?.maintenance?.completed}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your payment and charging history</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics?.recentTransactions?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics?.recentTransactions?.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium text-xs">{formatDate(tx.date)}</TableCell>
                      <TableCell className="text-xs">{tx.type}</TableCell>
                      <TableCell className="text-xs font-semibold">₹{tx.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={tx.status === "Posted" || tx.status === "Cleared" ? "default" : "secondary"} className="text-[10px]">
                          {tx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-muted-foreground text-sm text-center py-6">No recent transactions.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
