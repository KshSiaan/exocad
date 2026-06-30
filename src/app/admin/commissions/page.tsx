"use client";

import {
  ArrowUpRight,
  ChevronDown,
  CircleDollarSign,
  Download,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const KPI = [
  {
    label: "Total Commissions (YTD)",
    value: "$32,476",
    change: "+18.4%",
    icon: CircleDollarSign,
  },
  { label: "This Month", value: "$7,172", change: "+15.3%", icon: TrendingUp },
  {
    label: "Avg. Commission/Order",
    value: "$33.60",
    change: "+2.1%",
    icon: Wallet,
  },
  {
    label: "Pending Payouts",
    value: "$4,218",
    change: "12 orders",
    icon: ArrowUpRight,
  },
];

const MONTHLY = [
  { month: "Jan", commissions: 4200, orders: 120 },
  { month: "Feb", commissions: 4800, orders: 145 },
  { month: "Mar", commissions: 4425, orders: 132 },
  { month: "Apr", commissions: 5700, orders: 168 },
  { month: "May", commissions: 6180, orders: 189 },
  { month: "Jun", commissions: 7172, orders: 212 },
];

const BY_DESIGNER = [
  {
    name: "James Thompson",
    cases: 312,
    revenue: "$23,100",
    rate: "15%",
    commission: "$3,465",
    status: "Paid",
  },
  {
    name: "Sarah Chen",
    cases: 248,
    revenue: "$18,400",
    rate: "15%",
    commission: "$2,760",
    status: "Paid",
  },
  {
    name: "Lena Novak",
    cases: 178,
    revenue: "$13,250",
    rate: "15%",
    commission: "$1,988",
    status: "Pending",
  },
  {
    name: "Yuki Tanaka",
    cases: 203,
    revenue: "$15,200",
    rate: "15%",
    commission: "$2,280",
    status: "Paid",
  },
  {
    name: "Marcus Weber",
    cases: 167,
    revenue: "$12,400",
    rate: "15%",
    commission: "$1,860",
    status: "Pending",
  },
  {
    name: "Amara Diallo",
    cases: 134,
    revenue: "$9,950",
    rate: "15%",
    commission: "$1,493",
    status: "Paid",
  },
  {
    name: "Elena Rodriguez",
    cases: 89,
    revenue: "$6,620",
    rate: "15%",
    commission: "$993",
    status: "Paid",
  },
];

const TRANSACTIONS = [
  {
    id: "#COM-0847",
    date: "Jun 6, 2024",
    practice: "Bright Smiles Dental",
    designer: "Sarah Chen",
    type: "Full Arch",
    orderAmt: "$380",
    rate: "15%",
    commission: "$57.00",
    status: "Settled",
  },
  {
    id: "#COM-0846",
    date: "Jun 6, 2024",
    practice: "City Dental Group",
    designer: "Marcus Weber",
    type: "Crowns",
    orderAmt: "$120",
    rate: "15%",
    commission: "$18.00",
    status: "Settled",
  },
  {
    id: "#COM-0845",
    date: "Jun 5, 2024",
    practice: "Premier Orthodontics",
    designer: "Elena Rodriguez",
    type: "Implant Bar",
    orderAmt: "$290",
    rate: "15%",
    commission: "$43.50",
    status: "Pending",
  },
  {
    id: "#COM-0844",
    date: "Jun 5, 2024",
    practice: "Family Dental Care",
    designer: "Yuki Tanaka",
    type: "Veneers",
    orderAmt: "$180",
    rate: "15%",
    commission: "$27.00",
    status: "Settled",
  },
  {
    id: "#COM-0843",
    date: "Jun 4, 2024",
    practice: "Advanced Periodontics",
    designer: "Amara Diallo",
    type: "Bridges",
    orderAmt: "$240",
    rate: "15%",
    commission: "$36.00",
    status: "Pending",
  },
  {
    id: "#COM-0842",
    date: "Jun 4, 2024",
    practice: "Smile Vision Clinic",
    designer: "Lena Novak",
    type: "Full Arch",
    orderAmt: "$380",
    rate: "15%",
    commission: "$57.00",
    status: "Settled",
  },
  {
    id: "#COM-0841",
    date: "Jun 3, 2024",
    practice: "Advanced Periodontics",
    designer: "James Thompson",
    type: "Crown Set × 4",
    orderAmt: "$480",
    rate: "15%",
    commission: "$72.00",
    status: "Refunded",
  },
];

const TX_STATUS: Record<string, string> = {
  Settled: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
  Refunded: "bg-red-50 text-red-500 border-red-200",
};

const DESIGNER_STATUS: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
};

const C = "#9ca3af";
const BORDER = "#e5e7eb";
const CARD_BG = "#ffffff";
const FG = "#111827";

export default function CommissionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Commissions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Platform earnings from a 15% commission on every completed order.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
            <Download size={13} />
            Export
          </Button> */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {["7d", "30d", "3m", "1y"].map((p, i) => (
              <button
                key={p}
                type="button"
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${i === 1 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map((k) => (
          <Card key={k.label} className="bg-card border-border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{k.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {k.value}
                  </p>
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <TrendingUp size={10} />
                    {k.change}
                  </p>
                </div>
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <k.icon size={16} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Commission Earnings
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                Last 6 months
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={MONTHLY}>
                <defs>
                  <linearGradient id="comGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.5001 0.0987 203.7435)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.5001 0.0987 203.7435)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: C }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: C }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: CARD_BG,
                    border: `1px solid ${BORDER}`,
                    borderRadius: "8px",
                    fontSize: 12,
                    color: FG,
                  }}
                  formatter={(v) => [
                    `$${((v as number) ?? 0).toLocaleString()}`,
                    "Commission",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="commissions"
                  stroke="oklch(0.5001 0.0987 203.7435)"
                  strokeWidth={2}
                  fill="url(#comGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Orders per Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: C }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: C }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: CARD_BG,
                    border: `1px solid ${BORDER}`,
                    borderRadius: "8px",
                    fontSize: 12,
                    color: FG,
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="oklch(0.5001 0.0987 203.7435)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Commission by designer */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Commission by Designer
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-2 text-xs"
                >
                  This Month <ChevronDown size={11} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Designer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Cases
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Total Revenue
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Rate
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Commission
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BY_DESIGNER.map((d) => (
              <TableRow
                key={d.name}
                className="border-border hover:bg-gray-50 cursor-pointer"
              >
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                        {d.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">
                      {d.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {d.cases}
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground">
                  {d.revenue}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {d.rate}
                </TableCell>
                <TableCell className="text-sm font-bold text-primary">
                  {d.commission}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${DESIGNER_STATUS[d.status]}`}
                  >
                    {d.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Transaction log */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Commission Log
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
              <Download size={12} /> CSV
            </Button>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                ID
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Date
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Practice
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Designer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Service
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Order Amt
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Rate
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Commission
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTIONS.map((t) => (
              <TableRow
                key={t.id}
                className="border-border hover:bg-gray-50 cursor-pointer"
              >
                <TableCell className="pl-6 text-sm font-mono text-foreground">
                  {t.id}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.date}
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {t.practice}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.designer}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.type}
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground">
                  {t.orderAmt}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.rate}
                </TableCell>
                <TableCell className="text-sm font-bold text-primary">
                  {t.commission}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${TX_STATUS[t.status]}`}
                  >
                    {t.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 7 of 847 transactions
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
              disabled
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
