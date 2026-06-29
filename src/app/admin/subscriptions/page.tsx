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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

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
        <Badge>PAID MODE</Badge>
      </div>

      <div className="">
        <Card>
          <CardContent className="p-5 flex justify-between items-center">
            <div className="">
              <h3 className="text-lg font-semibold">
                Paid Subscription Active
              </h3>
              <p className="text-xs text-muted-foreground">
                Customers must pay to access this membership tier
              </p>
            </div>
            <div className="">
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Active Plan Tiers
            </CardTitle>
            {/* <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {["All", "Active", "Past Due", "Cancelled"].map((s, i) => (
                <button
                  key={s}
                  type="button"
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${i === 0 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div> */}
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Plan Type
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Plan Title
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Base Price
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Discount
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Final Price
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Validity
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Action
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
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
