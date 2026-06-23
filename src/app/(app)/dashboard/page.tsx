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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STATS = [
  {
    label: "Total Projects",
    value: "4",
    sub: "All Time",
    icon: FileText,
    color: "text-primary bg-primary/10",
  },
  {
    label: "Active Projects",
    value: "7",
    sub: "Currently in workflow",
    icon: Inbox,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Completed",
    value: "38",
    sub: "Successfully delivered",
    icon: CheckCircle,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Pending Acceptance",
    value: "31",
    sub: "Awaiting your review",
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

      <Tabs defaultValue="active">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Link
            href="/projects"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <TabsContent value="active" className="space-y-3 mt-4">
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
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {p.type}
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
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 mt-4">
          {RECENT_COMPLETED.map((p) => (
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
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={`star-${p.id}-${i}`}
                            size={11}
                            className={
                              i < p.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-foreground truncate">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Designer: {p.designer} · Completed: {p.date}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
