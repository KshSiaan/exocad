"use client";

import {
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  {
    label: "Active Jobs",
    value: "5",
    sub: "2 due this week",
    icon: Clock,
    color: "text-primary bg-primary/10",
  },
  {
    label: "This Month",
    value: "$2,840",
    sub: "+18% vs last month",
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Completed",
    value: "247",
    sub: "all time",
    icon: CheckCircle,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Rating",
    value: "4.9",
    sub: "127 reviews",
    icon: Star,
    color: "text-amber-600 bg-amber-50",
  },
];

const ACTIVE_JOBS = [
  {
    id: "PRJ-1042",
    title: "Full Arch Implant Bar",
    practice: "Bright Smiles Dental",
    type: "Implant Bar",
    status: "In Progress",
    due: "Jun 9, 2024",
    fee: "$145",
    priority: "Express",
  },
  {
    id: "PRJ-1044",
    title: "Crown & Bridge ×3",
    practice: "Premier Orthodontics",
    type: "Crown & Bridge",
    status: "New",
    due: "Jun 10, 2024",
    fee: "$95",
    priority: "Standard",
  },
  {
    id: "PRJ-1045",
    title: "All-on-4 Framework",
    practice: "Advanced Periodontics",
    type: "Full Arch",
    status: "In Progress",
    due: "Jun 12, 2024",
    fee: "$185",
    priority: "Standard",
  },
  {
    id: "PRJ-1046",
    title: "Implant Abutment ×2",
    practice: "City Dental Group",
    type: "Implants",
    status: "Under Review",
    due: "Jun 8, 2024",
    fee: "$110",
    priority: "Rush",
  },
  {
    id: "PRJ-1047",
    title: "Anterior Veneers ×4",
    practice: "Smile Vision Clinic",
    type: "Veneers",
    status: "New",
    due: "Jun 14, 2024",
    fee: "$100",
    priority: "Standard",
  },
];

const STATUS_STYLES: Record<string, string> = {
  New: "bg-blue-50 text-blue-600 border-blue-200",
  "In Progress": "bg-primary/10 text-primary border-primary/20",
  "Under Review": "bg-amber-50 text-amber-600 border-amber-200",
  Revision: "bg-purple-50 text-purple-600 border-purple-200",
};

const PRIORITY_STYLES: Record<string, string> = {
  Rush: "bg-red-50 text-red-500 border-red-200",
  Express: "bg-amber-50 text-amber-600 border-amber-200",
  Standard: "bg-muted text-muted-foreground border-border",
};

const RECENT_ACTIVITY = [
  {
    text: "New job request from Premier Orthodontics",
    time: "5 min ago",
    icon: "📋",
  },
  {
    text: "Payment of $145 received — PRJ-1040",
    time: "2 hrs ago",
    icon: "💰",
  },
  {
    text: "PRJ-1039 approved by Bright Smiles Dental",
    time: "5 hrs ago",
    icon: "✅",
  },
  { text: "Revision requested on PRJ-1038", time: "Yesterday", icon: "🔄" },
];

export default function DesignerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, Sarah
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            You have 2 new job requests and 1 case due today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-9 text-xs"
            asChild
          >
            <Link href="/designer/profile">Edit Availability</Link>
          </Button>
          <Button size="sm" className="gap-2 h-9 text-xs" asChild>
            <Link href="/designer/projects">View All Jobs</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="bg-white border-border/60 shadow-sm">
            <CardContent className="p-5 flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
              <div
                className={`size-9 rounded-xl flex items-center justify-center ${s.color}`}
              >
                <s.icon size={16} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active jobs */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Active Jobs
            </h2>
            <Link
              href="/designer/projects"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {ACTIVE_JOBS.map((j) => (
              <Card
                key={j.id}
                className="bg-white border-border/60 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">
                          {j.id}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[j.status]}`}
                        >
                          {j.status}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[j.priority]}`}
                        >
                          {j.priority}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {j.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {j.practice} · {j.type} · Due {j.due}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">
                        {j.fee}
                      </p>
                      <Link
                        href={`/designer/projects/${j.id}`}
                        className="text-xs text-primary hover:underline mt-1 block"
                      >
                        Open →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: earnings preview + activity */}
        <div className="space-y-4">
          {/* Earnings */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Earnings
                </CardTitle>
                <Link
                  href="/designer/earnings"
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  label: "This month",
                  value: "$2,840",
                  change: "+18%",
                  positive: true,
                },
                {
                  label: "Last month",
                  value: "$2,406",
                  change: "",
                  positive: true,
                },
                {
                  label: "Pending payout",
                  value: "$1,120",
                  change: "",
                  positive: true,
                },
                {
                  label: "All time",
                  value: "$24,720",
                  change: "",
                  positive: true,
                },
              ].map((e) => (
                <div
                  key={e.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs text-muted-foreground">
                    {e.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">
                      {e.value}
                    </span>
                    {e.change && (
                      <span className="text-[10px] text-emerald-500 flex items-center gap-0.5">
                        <TrendingUp size={10} />
                        {e.change}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs mt-1"
                asChild
              >
                <Link href="/designer/earnings">Request Payout</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {RECENT_ACTIVITY.map((a) => (
                <div key={a.text} className="flex items-start gap-2.5">
                  <span className="text-sm shrink-0 mt-0.5">{a.icon}</span>
                  <div>
                    <p className="text-xs text-foreground leading-snug">
                      {a.text}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
