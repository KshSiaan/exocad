"use client";

import { ArrowDownToLine, Briefcase, DollarSign, Search } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TOTAL_EARNINGS = 4280;
const TOTAL_WITHDRAWN = 2840;

const TRANSACTIONS = [
  {
    trx: "ORD-12847",
    designer: "Olivia Rhye",
    dentist: "Olivia Rhye",
    serviceType: "Implantology",
    amount: "$120.00",
    status: "In Progress",
    date: "05/04/2024",
  },
  {
    trx: "ORD-12847",
    designer: "Phoenix Baker",
    dentist: "Phoenix Baker",
    serviceType: "Implantology",
    amount: "$120.00",
    status: "Revision",
    date: "05/04/2024",
  },
  {
    trx: "ORD-12847",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Implantology",
    amount: "$120.00",
    status: "Revision",
    date: "05/04/2024",
  },
  {
    trx: "ORD-12847",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Implantology",
    amount: "$120.00",
    status: "Submitted",
    date: "05/04/2024",
  },
  {
    trx: "ORD-12847",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Implantology",
    amount: "$120.00",
    status: "Submitted",
    date: "05/04/2024",
  },
  {
    trx: "ORD-12847",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Implantology",
    amount: "$120.00",
    status: "Submitted",
    date: "05/04/2024",
  },
  {
    trx: "ORD-12847",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Implantology",
    amount: "$120.00",
    status: "Submitted",
    date: "05/04/2024",
  },
];
const REVENUE_DATA = [
  { month: "Jan", revenue: 13000, commission: 2800 },
  { month: "Feb", revenue: 15500, commission: 3100 },
  { month: "Mar", revenue: 14200, commission: 3400 },
  { month: "Apr", revenue: 18000, commission: 4200 },
  { month: "May", revenue: 22000, commission: 5100 },
  { month: "Jun", revenue: 26500, commission: 6200 },
  { month: "Jul", revenue: 29000, commission: 7200 },
];
function StatusBadge({ status }: { status: string }) {
  if (status === "In Progress")
    return (
      <span className="text-xs font-semibold text-amber-500">{status}</span>
    );
  if (status === "Revision")
    return (
      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-red-100 text-red-500">
        {status}
      </span>
    );
  if (status === "Submitted")
    return (
      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-600">
        {status}
      </span>
    );
  if (status === "Paid")
    return (
      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-600">
        {status}
      </span>
    );
  return (
    <span className="text-xs font-semibold text-muted-foreground">
      {status}
    </span>
  );
}

export default function DesignerEarningsPage() {
  const [search, setSearch] = useState("");

  const filtered = TRANSACTIONS.filter(
    (t) =>
      !search ||
      t.trx.toLowerCase().includes(search.toLowerCase()) ||
      t.designer.toLowerCase().includes(search.toLowerCase()) ||
      t.dentist.toLowerCase().includes(search.toLowerCase()) ||
      t.serviceType.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-border/60 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="size-9 rounded-lg bg-muted/60 flex items-center justify-center">
              <DollarSign size={16} className="text-muted-foreground" />
            </div>
            <span className="text-xs font-semibold text-emerald-600">
              +18.4%
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            ${TOTAL_EARNINGS.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Total Earnings</p>
        </div>

        <div className="bg-white rounded-2xl border border-border/60 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="size-9 rounded-lg bg-muted/60 flex items-center justify-center">
              <ArrowDownToLine size={16} className="text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Lifetime
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            ${TOTAL_WITHDRAWN.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Total Withdrawn</p>
        </div>
      </div>
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-base font-bold text-foreground tracking-wide">
                REVENUE ANALYTICS
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Comparing total revenue vs. platform commission
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-0.5">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-foreground inline-block" />
                REVENUE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground inline-block" />
                COMMISSION
              </span>
            </div>
          </div>
          <div className="h-[280px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 4, right: 4, left: -8, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--foreground))"
                      stopOpacity={0.12}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--foreground))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  tickFormatter={(v: number) =>
                    v === 0 ? "0" : `${(v / 1000) * 7.5}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v, name) => [
                    `$${Number(v ?? 0).toLocaleString()}`,
                    name === "revenue" ? "Revenue" : "Commission",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2}
                  fill="url(#revGrad)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="commission"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  fill="none"
                  dot={false}
                  activeDot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* Search + table */}
      <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
        {/* Search bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/60">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              {[
                "Project ID",
                "Designer",
                "Dentist",
                "Service Type",
                "Amount",
                "Status",
                "Date",
              ].map((col) => (
                <TableHead
                  key={col}
                  className="px-6 text-xs text-muted-foreground font-medium"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t, i) => (
              <TableRow
                key={`${t.trx}-${i}`}
                className="border-border/60 hover:bg-muted/20"
              >
                <TableCell className="px-6 py-4 text-sm font-medium text-muted-foreground">
                  {t.trx}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm font-semibold text-foreground">
                  {t.designer}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm font-semibold text-foreground">
                  {t.dentist}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Briefcase size={13} className="shrink-0" />
                    {t.serviceType}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm font-semibold text-foreground">
                  {t.amount}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <StatusBadge status={t.status} />
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                  {t.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
