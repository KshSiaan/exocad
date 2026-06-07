"use client";
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  UserX,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const STATS = [
  {
    label: "Total Designers",
    value: "1,247",
    change: "+12.5%",
    icon: Users,
    trend: "up",
  },
  {
    label: "Active Subscriptions",
    value: "479",
    change: "+8.2%",
    icon: CreditCard,
    trend: "up",
  },
  {
    label: "Monthly Revenue",
    value: "$47,810",
    change: "+15.3%",
    icon: DollarSign,
    trend: "up",
  },
  {
    label: "Banned Accounts",
    value: "12",
    change: "Last 30 days",
    icon: UserX,
    trend: "neutral",
  },
];

const _REVENUE_DATA = [
  { month: "Jan", revenue: 28000, orders: 120 },
  { month: "Feb", revenue: 32000, orders: 145 },
  { month: "Mar", revenue: 29500, orders: 132 },
  { month: "Apr", revenue: 38000, orders: 168 },
  { month: "May", revenue: 41200, orders: 189 },
  { month: "Jun", revenue: 47810, orders: 212 },
];

const DESIGNERS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    country: "🇺🇸",
    plan: "Scale",
    cases: 248,
    status: "Active",
    joined: "Jan 15, 2024",
  },
  {
    initials: "MW",
    name: "Marcus Weber",
    email: "marcus.weber@example.com",
    country: "🇩🇪",
    plan: "Grow",
    cases: 167,
    status: "Active",
    joined: "Feb 3, 2024",
  },
  {
    initials: "ER",
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    country: "🇪🇸",
    plan: "Launch",
    cases: 89,
    status: "Active",
    joined: "Mar 12, 2024",
  },
  {
    initials: "JT",
    name: "James Thompson",
    email: "j.thompson@example.com",
    country: "🇬🇧",
    plan: "Scale",
    cases: 312,
    status: "Suspended",
    joined: "Dec 8, 2023",
  },
  {
    initials: "YT",
    name: "Yuki Tanaka",
    email: "yuki.t@example.com",
    country: "🇯🇵",
    plan: "Grow",
    cases: 203,
    status: "Active",
    joined: "Jan 28, 2024",
  },
];

const RECENT_ORDERS = [
  {
    id: "#ORD-2847",
    practice: "Bright Smiles Dental",
    designer: "Sarah Chen",
    type: "Full Arch",
    amount: "$380",
    status: "Completed",
    date: "Jun 6, 2024",
  },
  {
    id: "#ORD-2846",
    practice: "City Dental Group",
    designer: "Marcus Weber",
    type: "Crowns",
    amount: "$120",
    status: "In Progress",
    date: "Jun 6, 2024",
  },
  {
    id: "#ORD-2845",
    practice: "Premier Orthodontics",
    designer: "Elena Rodriguez",
    type: "Implant Bars",
    amount: "$290",
    status: "Review",
    date: "Jun 5, 2024",
  },
  {
    id: "#ORD-2844",
    practice: "Family Dental Care",
    designer: "Yuki Tanaka",
    type: "Veneers",
    amount: "$180",
    status: "Completed",
    date: "Jun 5, 2024",
  },
  {
    id: "#ORD-2843",
    practice: "Advanced Periodontics",
    designer: "Amara Diallo",
    type: "Bridges",
    amount: "$240",
    status: "Pending",
    date: "Jun 4, 2024",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Suspended: "bg-red-500/10 text-red-500 border-red-500/20",
  Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Review: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Pending: "bg-muted text-muted-foreground border-border",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  {stat.trend === "up" ? (
                    <p className="text-xs text-emerald-500 flex items-center gap-1">
                      <TrendingUp size={11} />
                      {stat.change}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <stat.icon size={18} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Designer Management */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Designer Management
            </CardTitle>
            {/* <Button size="sm" className="gap-1.5 h-8 text-xs">
              + Add Designer
            </Button> */}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="relative flex-1 w-full">
              <svg
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search designers..."
                className="w-full h-9 rounded-lg border border-border bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs ">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
                  Designer
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Country
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Plan
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Cases
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Join Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DESIGNERS.map((d) => (
                <TableRow
                  key={d.email}
                  className="border-border hover:bg-muted/40 cursor-pointer"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                          {d.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">
                        {d.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.email}
                  </TableCell>
                  <TableCell className="text-base">{d.country}</TableCell>
                  <TableCell>
                    <span className="text-xs font-medium border border-border rounded px-2 py-0.5 text-foreground">
                      {d.plan}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {d.cases}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[d.status]}`}
                    >
                      {d.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.joined}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Recent Orders
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary gap-1 h-8"
            >
              View all <ArrowUpRight size={13} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
                  Order
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
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_ORDERS.map((o) => (
                <TableRow
                  key={o.id}
                  className="border-border hover:bg-muted/40 cursor-pointer"
                >
                  <TableCell className="pl-6 text-sm font-mono text-foreground">
                    {o.id}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {o.practice}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {o.designer}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {o.type}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-foreground">
                    {o.amount}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {o.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
