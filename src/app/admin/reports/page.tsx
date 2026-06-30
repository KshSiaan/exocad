"use client";
import {
  AlertCircleIcon,
  DollarSign,
  Download,
  ShoppingBag,
  StarIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MONTHLY = [
  { month: "Jan", revenue: 28000, commissions: 4200, orders: 120 },
  { month: "Feb", revenue: 32000, commissions: 4800, orders: 145 },
  { month: "Mar", revenue: 29500, commissions: 4425, orders: 132 },
  { month: "Apr", revenue: 38000, commissions: 5700, orders: 168 },
  { month: "May", revenue: 41200, commissions: 6180, orders: 189 },
  { month: "Jun", revenue: 47810, commissions: 7172, orders: 212 },
];

const SERVICE_MIX = [
  { name: "Full Arch", value: 34, color: "oklch(0.6001 0.0987 203.7435)" },
  { name: "Crowns", value: 24, color: "oklch(0.5960 0.1450 163.2250)" },
  { name: "Implant Bars", value: 18, color: "oklch(0.7650 0.1770 163.2230)" },
  { name: "Veneers", value: 14, color: "oklch(0.4603 0.0747 203.6719)" },
  { name: "Bridges", value: 10, color: "#6b7280" },
];

const WEEKLY = [
  { day: "Mon", orders: 28, revenue: 5240 },
  { day: "Tue", orders: 34, revenue: 6380 },
  { day: "Wed", orders: 22, revenue: 4120 },
  { day: "Thu", orders: 41, revenue: 7690 },
  { day: "Fri", orders: 38, revenue: 7140 },
  { day: "Sat", orders: 19, revenue: 3560 },
  { day: "Sun", orders: 12, revenue: 2250 },
];

const TOP_DESIGNERS = [
  {
    name: "Sarah Chen",
    cases: 248,
    revenue: "$18,400",
    rating: 4.9,
    commission: "$2,760",
  },
  {
    name: "James Thompson",
    cases: 312,
    revenue: "$23,100",
    rating: 3.8,
    commission: "$3,465",
  },
  {
    name: "Yuki Tanaka",
    cases: 203,
    revenue: "$15,200",
    rating: 4.8,
    commission: "$2,280",
  },
  {
    name: "Marcus Weber",
    cases: 167,
    revenue: "$12,400",
    rating: 4.7,
    commission: "$1,860",
  },
  {
    name: "Lena Novak",
    cases: 178,
    revenue: "$13,250",
    rating: 4.9,
    commission: "$1,988",
  },
];

const TRANSACTIONS = [
  {
    id: "#TXN-9921",
    date: "Jun 6, 2024",
    practice: "Bright Smiles Dental",
    designer: "Sarah Chen",
    type: "Full Arch",
    amount: "$380",
    commission: "$57",
    net: "$323",
    status: "Settled",
  },
  {
    id: "#TXN-9920",
    date: "Jun 6, 2024",
    practice: "City Dental Group",
    designer: "Marcus Weber",
    type: "Crowns",
    amount: "$120",
    commission: "$18",
    net: "$102",
    status: "Settled",
  },
  {
    id: "#TXN-9919",
    date: "Jun 5, 2024",
    practice: "Advanced Periodontics",
    designer: "Amara Diallo",
    type: "Bridges",
    amount: "$240",
    commission: "$36",
    net: "$204",
    status: "Pending",
  },
  {
    id: "#TXN-9918",
    date: "Jun 5, 2024",
    practice: "Family Dental Care",
    designer: "Yuki Tanaka",
    type: "Veneers",
    amount: "$180",
    commission: "$27",
    net: "$153",
    status: "Settled",
  },
  {
    id: "#TXN-9917",
    date: "Jun 4, 2024",
    practice: "Premier Orthodontics",
    designer: "Elena Rodriguez",
    type: "Implant Bar",
    amount: "$290",
    commission: "$43.50",
    net: "$246.50",
    status: "Refunded",
  },
];

const TX_STATUS: Record<string, string> = {
  Settled: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Refunded: "bg-red-500/10 text-red-500 border-red-500/20",
};

const KPI = [
  {
    label: "TOTAL REVENUE",
    value: "$216,510",
    change: "+15.3%",
    icon: DollarSign,
  },
  {
    label: "ACTIVE ORDERS",
    value: "966",
    change: "+12.1%",
    icon: ShoppingBag,
  },
  {
    label: "Avg. Order Value",
    value: "$224",
    change: "+2.8%",
    icon: TrendingUp,
  },
  {
    label: "COMMISSION EARNED",
    value: "$216,510",
    change: "+15.3%",
    icon: DollarSign,
  },
  {
    label: "DISPUTES / REFUNDS",
    value: "$216,510",
    change: "4",
    icon: AlertCircleIcon,
  },
];

const C = "#6b7280";
const BORDER = "#e5e7eb";
const CARD_BG = "#ffffff";
const FG = "#111827";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Analytics, revenue, and transaction history for the platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
            <Download size={13} />
            Export Report
          </Button> */}
          {/* Period selector */}
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
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        {KPI.map((k) => (
          <Card key={k.label} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{k.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {k.value}
                  </p>
                  <p className="text-xs flex items-center gap-1">
                    {/* <TrendingUp size={10} /> */}
                    {k.change}
                  </p>
                </div>
                <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <k.icon size={16} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue chart + pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Revenue & Commissions
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                Last 6 months
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={MONTHLY}>
                <defs>
                  <linearGradient id="gr1" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.6001 0.0987 203.7435)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.6001 0.0987 203.7435)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  {/* <linearGradient id="gr2" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.5960 0.1450 163.2250)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.5960 0.1450 163.2250)"
                      stopOpacity={0}
                    />
                  </linearGradient> */}
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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
                    "",
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: C }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="oklch(0.6001 0.0987 203.7435)"
                  strokeWidth={2}
                  fill="url(#gr1)"
                />
                {/* <Area
                  type="monotone"
                  dataKey="commissions"
                  name="Commissions"
                  stroke="oklch(0.5960 0.1450 163.2250)"
                  strokeWidth={2}
                  fill="url(#gr2)"
                /> */}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Service Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={SERVICE_MIX}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {SERVICE_MIX.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: CARD_BG,
                    border: `1px solid ${BORDER}`,
                    borderRadius: "8px",
                    fontSize: 12,
                    color: FG,
                  }}
                  formatter={(v) => [`${(v as number) ?? 0}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {SERVICE_MIX.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2 rounded-full"
                      style={{ background: s.color }}
                    />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {s.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly orders + top designers */}
      <div className="grid gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Top Designers & Admin Top Rated Approvals
            </CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
                  Designer
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Cases
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Revenue
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Rating
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Commission
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TOP_DESIGNERS.map((d) => (
                <TableRow
                  key={d.name}
                  className="border-border hover:bg-muted/40"
                >
                  <TableCell className="pl-6 text-sm font-medium text-foreground">
                    {d.name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.cases}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-foreground">
                    {d.revenue}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-foreground text-center gap-1 flex items-center">
                    <StarIcon className="size-4 fill-amber-400" stroke="none" />{" "}
                    4.5
                  </TableCell>
                  <TableCell className="text-sm text-emerald-500 font-medium">
                    {d.commission}
                  </TableCell>
                  <TableCell className="text-sm">
                    <Button variant="default" className="" size="lg">
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Transaction History
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
              <Download size={12} />
              CSV
            </Button>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
                ID
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Practice
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Designer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Type
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Amount
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Commission
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Net
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTIONS.map((t) => (
              <TableRow
                key={t.id}
                className="border-border hover:bg-muted/40 cursor-pointer"
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
                <TableCell className="text-sm font-semibold text-foreground">
                  {t.amount}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.commission}
                </TableCell>
                <TableCell className="text-sm font-semibold text-emerald-500">
                  {t.net}
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
      </Card>
    </div>
  );
}
