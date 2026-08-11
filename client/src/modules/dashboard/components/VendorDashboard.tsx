"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, CheckCircle, Clock, Star, PlayCircle } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface VendorDashboardProps {
  metrics: {
    maintenance: {
      open: number;
      inProgress: number;
      completed: number;
      total: number;
    };
    performance: {
      rating: number;
      totalReviews: number;
    };
  };
}

export function VendorDashboard({ metrics }: VendorDashboardProps) {
  const ticketData = [
    { name: "Open", value: metrics.maintenance.open },
    { name: "In Progress", value: metrics.maintenance.inProgress },
    { name: "Completed", value: metrics.maintenance.completed },
  ].filter(item => item.value > 0);

  const COLORS = ["#F59E0B", "#3B82F6", "#10B981"];

  return (
    <div className="space-y-8 p-6 w-full mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Manage your assigned maintenance tickets and review performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Tickets</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.maintenance.total}</div>
            <p className="text-xs text-muted-foreground">Overall jobs assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{metrics.maintenance.open}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <PlayCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.maintenance.inProgress}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.performance.rating || "N/A"}</div>
            <p className="text-xs text-muted-foreground">From {metrics.performance.totalReviews} reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Work Distribution</CardTitle>
            <CardDescription>Breakdown of your job statuses</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px]">
            {ticketData.length > 0 ? (
              <>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ticketData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ticketData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, "Tickets"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between w-full px-6 text-sm font-medium">
                  {metrics.maintenance.open > 0 && (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded bg-amber-500" />
                      Open: {metrics.maintenance.open}
                    </span>
                  )}
                  {metrics.maintenance.inProgress > 0 && (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded bg-blue-500" />
                      Active: {metrics.maintenance.inProgress}
                    </span>
                  )}
                  {metrics.maintenance.completed > 0 && (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded bg-emerald-500" />
                      Done: {metrics.maintenance.completed}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="text-muted-foreground text-sm">No ticket activity to display.</div>
            )}
          </CardContent>
        </Card>

        {/* Quality & Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Rating & Reviews</CardTitle>
            <CardDescription>Your service feedback summary</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px] space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-12 w-12 text-yellow-500 fill-yellow-500" />
              <span className="text-5xl font-extrabold">{metrics.performance.rating || "5.0"}</span>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              Keep up the excellent work! Consistently high ratings help you receive priority job allocations.
            </p>
            <Badge variant="secondary" className="px-4 py-1 text-sm">
              Level 1 Verified Contractor
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
