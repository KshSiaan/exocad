"use client";
import {
  CreditCard,
  DollarSign,
  Download,
  MoreHorizontal,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
  DropdownMenuSeparator,
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

const GROWTH_DATA = [
  { month: "Jan", scale: 80, grow: 140, launch: 60 },
  { month: "Feb", scale: 90, grow: 155, launch: 68 },
  { month: "Mar", scale: 98, grow: 168, launch: 71 },
  { month: "Apr", scale: 108, grow: 192, launch: 78 },
  { month: "May", scale: 118, grow: 215, launch: 90 },
  { month: "Jun", scale: 124, grow: 231, launch: 124 },
];

const SUBSCRIPTIONS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    email: "sarah.chen@exoconnect.io",
    plan: "Scale",
    planColor: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    amount: "$199/mo",
    nextBilling: "Jul 15, 2024",
    status: "Active",
    since: "Jan 15, 2024",
    paymentMethod: "Visa •••• 4242",
  },
  {
    initials: "MW",
    name: "Marcus Weber",
    email: "marcus.weber@exoconnect.io",
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    amount: "$99/mo",
    nextBilling: "Jul 3, 2024",
    status: "Active",
    since: "Feb 3, 2024",
    paymentMethod: "Mastercard •••• 8821",
  },
  {
    initials: "JT",
    name: "James Thompson",
    email: "j.thompson@exoconnect.io",
    plan: "Scale",
    planColor: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    amount: "$199/mo",
    nextBilling: "—",
    status: "Cancelled",
    since: "Dec 8, 2023",
    paymentMethod: "Visa •••• 1193",
  },
  {
    initials: "YT",
    name: "Yuki Tanaka",
    email: "yuki.t@exoconnect.io",
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    amount: "$99/mo",
    nextBilling: "Jul 28, 2024",
    status: "Active",
    since: "Jan 28, 2024",
    paymentMethod: "Visa •••• 6677",
  },
  {
    initials: "AD",
    name: "Amara Diallo",
    email: "amara.d@exoconnect.io",
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    amount: "$99/mo",
    nextBilling: "Jul 5, 2024",
    status: "Active",
    since: "Apr 5, 2024",
    paymentMethod: "Mastercard •••• 3344",
  },
  {
    initials: "ER",
    name: "Elena Rodriguez",
    email: "elena.r@exoconnect.io",
    plan: "Launch",
    planColor: "text-muted-foreground border-border bg-muted",
    amount: "$49/mo",
    nextBilling: "Jul 12, 2024",
    status: "Past Due",
    since: "Mar 12, 2024",
    paymentMethod: "Visa •••• 9901",
  },
  {
    initials: "LN",
    name: "Lena Novak",
    email: "lena.n@exoconnect.io",
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    amount: "$99/mo",
    nextBilling: "Jul 14, 2024",
    status: "Active",
    since: "Feb 14, 2024",
    paymentMethod: "Mastercard •••• 5512",
  },
];

const STATUS_CONFIG: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Cancelled: "bg-muted text-muted-foreground border-border",
  "Past Due": "bg-red-500/10 text-red-500 border-red-500/20",
  Paused: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

const KPI = [
  { label: "Total Subscribers", value: "479", change: "+8.2%", icon: Users },
  { label: "MRR", value: "$38,521", change: "+15.3%", icon: DollarSign },
  { label: "Churn Rate", value: "2.1%", change: "-0.4%", icon: RefreshCw },
  { label: "Avg. LTV", value: "$1,240", change: "+6.1%", icon: CreditCard },
];

const C = "#6b7280";
const BORDER = "#e5e7eb";
const CARD_BG = "#ffffff";
const FG = "#111827";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Subscriptions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track all designer subscriptions, billing cycles, and MRR.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
          <Download size={13} />
          Export
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map((k) => (
          <Card key={k.label} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{k.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {k.value}
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${k.change.startsWith("-") && k.label !== "Churn Rate" ? "text-red-500" : "text-emerald-500"}`}
                  >
                    <TrendingUp size={10} />
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

      {/* Growth chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Subscription Growth by Plan
            </CardTitle>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={GROWTH_DATA}>
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
              <Legend wrapperStyle={{ fontSize: 11, color: C }} />
              <Line
                type="monotone"
                dataKey="scale"
                name="Scale"
                stroke="oklch(0.5960 0.1450 163.2250)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="grow"
                name="Grow"
                stroke="oklch(0.6001 0.0987 203.7435)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="launch"
                name="Launch"
                stroke="oklch(0.4603 0.0747 203.6719)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Subscriptions table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              All Subscriptions
            </CardTitle>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {["All", "Active", "Past Due", "Cancelled"].map((s, i) => (
                <button
                  key={s}
                  type="button"
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${i === 0 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Designer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Plan
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Amount
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Next Billing
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Payment
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Since
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUBSCRIPTIONS.map((s) => (
              <TableRow
                key={s.email}
                className="border-border hover:bg-muted/40 cursor-pointer"
              >
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                        {s.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {s.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-semibold border rounded px-2.5 py-0.5 ${s.planColor}`}
                  >
                    {s.plan}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">
                  {s.amount}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {s.nextBilling}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {s.paymentMethod}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {s.since}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_CONFIG[s.status]}`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {s.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal size={15} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Change Plan</DropdownMenuItem>
                      <DropdownMenuItem>Resend Invoice</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 focus:text-red-500">
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {SUBSCRIPTIONS.length} of 479 subscriptions
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
