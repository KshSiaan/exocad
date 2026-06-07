"use client";

import {
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Inbox,
  Plus,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  {
    label: "Active Projects",
    value: "4",
    sub: "2 awaiting review",
    icon: FileText,
    color: "text-primary bg-primary/10",
  },
  {
    label: "Messages",
    value: "7",
    sub: "3 unread",
    icon: Inbox,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Completed",
    value: "38",
    sub: "this year",
    icon: CheckCircle,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Avg Turnaround",
    value: "31h",
    sub: "last 10 orders",
    icon: Clock,
    color: "text-amber-600 bg-amber-50",
  },
];

const ACTIVE_PROJECTS = [
  {
    id: "PRJ-1042",
    title: "Full Arch Implant Bar — Patient #2847",
    designer: "Sarah Chen",
    type: "Implant Bar",
    status: "In Progress",
    statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    due: "Jun 9, 2024",
    price: "$145",
  },
  {
    id: "PRJ-1041",
    title: "Crown & Bridge — #1041",
    designer: "Elena Rodriguez",
    type: "Crown & Bridge",
    status: "Under Review",
    statusColor: "bg-amber-50 text-amber-600 border-amber-200",
    due: "Jun 8, 2024",
    price: "$95",
  },
  {
    id: "PRJ-1039",
    title: "Anterior Veneers ×6 — #1039",
    designer: "Yuki Tanaka",
    type: "Veneers",
    status: "Revision",
    statusColor: "bg-purple-50 text-purple-600 border-purple-200",
    due: "Jun 10, 2024",
    price: "$110",
  },
  {
    id: "PRJ-1038",
    title: "Implant Abutment ×2 — #1038",
    designer: "Marcus Weber",
    type: "Implants",
    status: "In Progress",
    statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    due: "Jun 11, 2024",
    price: "$120",
  },
];

const RECENT_COMPLETED = [
  {
    id: "PRJ-1035",
    title: "All-on-4 Framework",
    designer: "Sarah Chen",
    date: "Jun 1, 2024",
    rating: 5,
    price: "$195",
  },
  {
    id: "PRJ-1033",
    title: "PFM Crown Set ×4",
    designer: "Marcus Weber",
    date: "May 28, 2024",
    rating: 5,
    price: "$88",
  },
  {
    id: "PRJ-1030",
    title: "Partial Denture",
    designer: "James Thompson",
    date: "May 22, 2024",
    rating: 4,
    price: "$75",
  },
];

const MESSAGES = [
  {
    from: "Sarah Chen",
    text: "I've uploaded the revised STL for your review.",
    time: "10 min ago",
    unread: true,
  },
  {
    from: "Elena Rodriguez",
    text: "Could you clarify the margin on tooth #14?",
    time: "1 hr ago",
    unread: true,
  },
  {
    from: "Support",
    text: "Your invoice #INV-2847 is ready.",
    time: "3 hrs ago",
    unread: false,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, Dr. Martinez
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here's what's happening with your cases.
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/projects/new">
            <Plus size={15} />
            New Project
          </Link>
        </Button>
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
        {/* Active Projects */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Active Projects
            </h2>
            <Link
              href="/projects"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {ACTIVE_PROJECTS.map((p) => (
              <Card
                key={p.id}
                className="bg-white border-border/60 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {p.id}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${p.statusColor}`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground truncate">
                        {p.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Designer: {p.designer} · Due: {p.due}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">
                        {p.price}
                      </p>
                      <Link
                        href={`/projects/${p.id}`}
                        className="text-xs text-primary hover:underline mt-1 block"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right column: messages + recent completed */}
        <div className="space-y-4">
          {/* Messages */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  Messages
                </CardTitle>
                <Link
                  href="/messages"
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {MESSAGES.map((m) => (
                <Link
                  key={`msg-${m.from}-${m.time}`}
                  href="/messages"
                  className="flex items-start gap-3 px-5 py-3 hover:bg-muted/40 transition-colors border-t border-border/40 first:border-0"
                >
                  <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {m.from
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={`text-xs font-semibold ${m.unread ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {m.from}
                      </p>
                      {m.unread && (
                        <span className="size-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {m.text}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {m.time}
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent completed */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Recently Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {RECENT_COMPLETED.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {p.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {p.designer} · {p.date}
                    </p>
                    <div className="flex mt-0.5">
                      {Array.from({ length: p.rating }, (_, i) => (
                        <Star
                          key={`star-${p.id}-${i}`}
                          className="size-2.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-foreground shrink-0">
                    {p.price}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
