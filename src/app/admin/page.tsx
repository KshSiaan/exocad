"use client";

import { useState } from "react";
import {
  AlertCircle,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/api";

// ── Data ──────────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "Jan", revenue: 13000, commission: 2800 },
  { month: "Feb", revenue: 15500, commission: 3100 },
  { month: "Mar", revenue: 14200, commission: 3400 },
  { month: "Apr", revenue: 18000, commission: 4200 },
  { month: "May", revenue: 22000, commission: 5100 },
  { month: "Jun", revenue: 26500, commission: 6200 },
  { month: "Jul", revenue: 29000, commission: 7200 },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    icon: Clock,
    title: "8 Appointments",
    sub: "Starting at 9:00 AM",
    type: "appointment",
  },
  {
    id: 2,
    icon: UserPlus,
    title: "New Designer Registration",
    sub: "Aris T. completed registration",
    type: "registration",
  },
  {
    id: 3,
    icon: AlertCircle,
    title: "New Dispute Opened",
    sub: "Issue reported regarding Project #892",
    type: "dispute",
  },
  {
    id: 4,
    icon: AlertCircle,
    title: "New Dispute Opened",
    sub: "Issue reported regarding Project #892",
    type: "dispute",
  },
  {
    id: 5,
    icon: AlertCircle,
    title: "New Dispute Opened",
    sub: "Issue reported regarding Project #892",
    type: "dispute",
  },
];

const ACTIVITY_LOG = [
  {
    id: 1,
    initials: "SC",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    action: "Completed project #892 — Full Arch design",
    time: "2 min ago",
    type: "Project Completed",
    details:
      "Sarah completed a full arch dental design for Bright Smiles Dental. The project was delivered on time and approved by the dentist.",
  },
  {
    id: 2,
    initials: "AT",
    name: "Aris T.",
    email: "aris.t@example.com",
    action: "Registered as new designer",
    time: "14 min ago",
    type: "Registration",
    details:
      "Aris T. completed the designer onboarding process. Profile is pending admin verification.",
  },
  {
    id: 3,
    initials: "MW",
    name: "Marcus Weber",
    email: "marcus.weber@example.com",
    action: "Opened dispute on Project #891",
    time: "1 hr ago",
    type: "Dispute",
    details:
      "Marcus raised a dispute claiming the dentist rejected revisions beyond agreed scope. Case is under review.",
  },
  {
    id: 4,
    initials: "ER",
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    action: "Upgraded subscription to Scale plan",
    time: "3 hr ago",
    type: "Subscription",
    details:
      "Elena upgraded from Grow to Scale plan. Billing updated. New limits apply immediately.",
  },
  {
    id: 5,
    initials: "JT",
    name: "James Thompson",
    email: "j.thompson@example.com",
    action: "Account suspended for ToS violation",
    time: "5 hr ago",
    type: "Account Action",
    details:
      "James Thompson's account was suspended following a confirmed Terms of Service violation. Admin review required before reinstatement.",
  },
  {
    id: 6,
    initials: "YT",
    name: "Yuki Tanaka",
    email: "yuki.t@example.com",
    action: "Submitted 3 new orders",
    time: "6 hr ago",
    type: "Order",
    details:
      "Yuki submitted orders #2844, #2843, #2842. All pending dentist approval.",
  },
];

const ACTION_BADGE: Record<string, string> = {
  "Project Completed":
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Registration: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Dispute: "bg-red-500/10 text-red-600 border-red-500/20",
  Subscription: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  "Account Action": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Order: "bg-sky-500/10 text-sky-600 border-sky-500/20",
};

// ── Component ─────────────────────────────────────────────────────────────────

type ActivityEntry = (typeof ACTIVITY_LOG)[number];

export default function AdminDashboardPage() {
  const [selected, setSelected] = useState<ActivityEntry | null>(null);
  const { data: cards, isPending: cardsPending } = useQuery({
    queryKey: ["admin-dashboard-card"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        users: {
          total_users: number;
          dentist: number;
          designer: number;
        };
        total_revenue: number;
        platform_earnings: number;
        active_subscribers: number;
      };
    }> => {
      return howl(`/admin/card-info`);
    },
  });
  const { data: revenue, isPending: revenuePending } = useQuery({
    queryKey: ["admin-dashboard-revenue"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        filter: string;
        revenue_chart: Array<{
          month: string;
          value: number;
        }>;
        commission_chart: Array<{
          month: string;
          value: number;
        }>;
      };
    }> => {
      return howl(`/admin/revenue-commission-chart?filter=monthly `);
    },
  });
  const { data, isPending } = useQuery({
    queryKey: ["admin-dashboard-revenue"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        filter: string;
        revenue_chart: Array<{
          month: string;
          value: number;
        }>;
        commission_chart: Array<{
          month: string;
          value: number;
        }>;
      };
    }> => {
      return howl(`/admin/get-recent-activities?per_page=5`);
    },
  });

  const STATS = [
    {
      label: "TOTAL USERS",
      value: cardsPending
        ? "Loading..."
        : `${cards?.data.users.total_users ?? 0}`,
      sub: "Dentists: 450 / Designers: 280",
      icon: Users,
    },
    {
      label: "TOTAL REVENUE",
      value: cardsPending
        ? "Loading..."
        : `$${(cards?.data.total_revenue ?? 0).toLocaleString()}`,
      sub: "Gross platform volume",
      icon: DollarSign,
    },
    {
      label: "PLATFORM EARNINGS",
      value: cardsPending
        ? "Loading..."
        : `$${(cards?.data.platform_earnings ?? 0).toLocaleString()}`,
      sub: "Total commission (20% avg)",
      icon: TrendingUp,
    },
    {
      label: "ACTIVE SUBSCRIBERS",
      value: cardsPending
        ? "Loading..."
        : `${cards?.data.active_subscribers ?? 0}`,
      sub: "Current monthly plans",
      icon: CreditCard,
    },
  ];
  const chartData =
    revenue?.data.revenue_chart.map((item, index) => ({
      month: item.month,
      revenue: item.value,
      commission: revenue.data.commission_chart[index]?.value ?? 0,
    })) ?? [];
  return (
    <div className="space-y-6">
      {/* ── Stat cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-6">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
                {s.label}
              </p>
              <p className="text-3xl font-bold text-foreground mb-1">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Chart + Recent Activity ─────────────────────────────────────── */}
      <div className="">
        {/* Revenue chart */}
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
                  data={chartData}
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
      </div>

      {/* ── Recent Activities Table ─────────────────────────────────────── */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
                  User
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Action
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Time
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground pr-6 text-right">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ACTIVITY_LOG.map((entry) => (
                <TableRow
                  key={entry.id}
                  className="border-border hover:bg-muted/40"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                          {entry.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">
                        {entry.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {entry.email}
                  </TableCell>
                  <TableCell className="text-sm text-foreground max-w-[260px]">
                    {entry.action}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border whitespace-nowrap ${ACTION_BADGE[entry.type] ?? "bg-muted text-muted-foreground border-border"}`}
                    >
                      {entry.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {entry.time}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSelected(entry)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Detail Modal ────────────────────────────────────────────────── */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                    {selected.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {selected.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selected.email}
                  </p>
                </div>
                <span
                  className={`ml-auto inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${ACTION_BADGE[selected.type] ?? "bg-muted text-muted-foreground border-border"}`}
                >
                  {selected.type}
                </span>
              </div>
              <div className="rounded-lg bg-muted/50 border border-border p-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Action
                </p>
                <p className="text-sm text-foreground">{selected.action}</p>
              </div>
              <div className="rounded-lg bg-muted/50 border border-border p-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Details
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {selected.details}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{selected.time}</p>
            </div>
          )}
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  );
}
