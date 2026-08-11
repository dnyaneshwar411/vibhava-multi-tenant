"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  DoorOpen, 
  Users, 
  FileText, 
  Wrench, 
  Truck, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

interface StaffDashboardProps {
  metrics: {
    properties: number;
    units: {
      total: number;
      occupied: number;
      vacant: number;
      occupancyRate: number;
    };
    tenants: number;
    activeLeases: number;
    maintenance: {
      open: number;
      inProgress: number;
      completed: number;
      total: number;
    };
    vendors: number;
    financials: {
      totalRevenue: number;
      totalExpenses: number;
      netIncome: number;
    };
  };
}

export function StaffDashboard({ metrics }: StaffDashboardProps) {
  const financialData = [
    {
      name: "Financial Overview",
      Revenue: metrics.financials.totalRevenue,
      Expenses: metrics.financials.totalExpenses,
      NetIncome: metrics.financials.netIncome,
    },
  ];

  const occupancyData = [
    { name: "Occupied", value: metrics.units.occupied },
    { name: "Vacant", value: metrics.units.vacant },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  const hasFinancialData = financialData && financialData.some(
    (item) => item.Revenue > 0 || item.Expenses > 0 || item.NetIncome > 0
  );

  return (
    <div className="space-y-8 p-6 w-full mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
        <p className="text-muted-foreground">Overview of properties, units, maintenance, and financials.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.properties}</div>
            <p className="text-xs text-muted-foreground">Total managed assets</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.tenants}</div>
            <p className="text-xs text-muted-foreground">Active renters</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeLeases}</div>
            <p className="text-xs text-muted-foreground">Signed agreements</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.vendors}</div>
            <p className="text-xs text-muted-foreground">Service providers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Rent collected vs Maintenance expenses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {!hasFinancialData ? (
              <div className="flex h-full w-full flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground">No financial data available to display.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                  <Legend />
                  <Bar dataKey="Revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="NetIncome" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Occupancy Overview</CardTitle>
            <CardDescription>Occupied vs Vacant Units</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px]">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Units"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between w-full px-6 text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded bg-emerald-500" />
                Occupied: {metrics.units.occupied}
              </span>
              <span className="text-muted-foreground">Rate: {metrics.units.occupancyRate}%</span>
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded bg-red-500" />
                Vacant: {metrics.units.vacant}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Tickets</CardTitle>
            <CardDescription>Current operational workload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="border rounded-lg p-3">
                <div className="text-xl font-bold text-amber-500">{metrics.maintenance.open}</div>
                <div className="text-xs text-muted-foreground mt-1">Open</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="text-xl font-bold text-blue-500">{metrics.maintenance.inProgress}</div>
                <div className="text-xs text-muted-foreground mt-1">In Progress</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="text-xl font-bold text-emerald-500">{metrics.maintenance.completed}</div>
                <div className="text-xs text-muted-foreground mt-1">Completed</div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-sm font-medium">Total Logged Tickets</span>
              <Badge variant="outline">{metrics.maintenance.total}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Ledger Summary</CardTitle>
            <CardDescription>Profit, loss, and cash flow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Total Rent Inflow</span>
              </div>
              <span className="font-semibold text-emerald-600">₹{metrics.financials.totalRevenue.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Maintenance Expenses</span>
              </div>
              <span className="font-semibold text-red-600">₹{metrics.financials.totalExpenses.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between border-t pt-3 font-bold text-lg">
              <span>Net Position</span>
              <span className={metrics.financials.netIncome >= 0 ? "text-emerald-600" : "text-red-600"}>
                ₹{metrics.financials.netIncome.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
