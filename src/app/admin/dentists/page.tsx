"use client";

import {
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const DESIGNERS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    email: "sarah.chen@exoconnect.io",
    location: "🇺🇸 San Francisco",
    specialties: ["Full Arch", "Implant Bars", "+1"],
    plan: "Scale",
    planColor: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    cases: 248,
    rating: 4.9,
    status: "Active",
    joined: "Jan 15, 2024",
  },
  {
    initials: "MW",
    name: "Marcus Weber",
    email: "marcus.weber@exoconnect.io",
    location: "🇩🇪 Berlin",
    specialties: ["Veneers", "Crowns", "+1"],
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    cases: 167,
    rating: 4.7,
    status: "Active",
    joined: "Feb 3, 2024",
  },
  {
    initials: "ER",
    name: "Elena Rodriguez",
    email: "elena.r@exoconnect.io",
    location: "🇪🇸 Madrid",
    specialties: ["Implant Bars", "Overdentures"],
    plan: "Launch",
    planColor: "text-muted-foreground border-border bg-muted",
    cases: 89,
    rating: 4.5,
    status: "Active",
    joined: "Mar 12, 2024",
  },
  {
    initials: "JT",
    name: "James Thompson",
    email: "j.thompson@exoconnect.io",
    location: "🇬🇧 London",
    specialties: ["Full Arch", "Crowns", "+1"],
    plan: "Scale",
    planColor: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    cases: 312,
    rating: 3.8,
    status: "Suspended",
    joined: "Dec 8, 2023",
  },
  {
    initials: "YT",
    name: "Yuki Tanaka",
    email: "yuki.t@exoconnect.io",
    location: "🇯🇵 Tokyo",
    specialties: ["Veneers", "Crowns", "+1"],
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    cases: 203,
    rating: 4.8,
    status: "Active",
    joined: "Jan 28, 2024",
  },
  {
    initials: "AD",
    name: "Amara Diallo",
    email: "amara.d@exoconnect.io",
    location: "🇫🇷 Paris",
    specialties: ["Crowns", "Bridges", "+1"],
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    cases: 134,
    rating: 4.6,
    status: "Active",
    joined: "Apr 5, 2024",
  },
  {
    initials: "KP",
    name: "Kofi Patel",
    email: "kofi.p@exoconnect.io",
    location: "🇮🇳 Mumbai",
    specialties: ["Full Arch", "Implant Bars"],
    plan: "Launch",
    planColor: "text-muted-foreground border-border bg-muted",
    cases: 41,
    rating: 4.2,
    status: "Pending",
    joined: "May 20, 2024",
  },
  {
    initials: "LN",
    name: "Lena Novak",
    email: "lena.n@exoconnect.io",
    location: "🇨🇿 Prague",
    specialties: ["Veneers", "Overdentures"],
    plan: "Grow",
    planColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    cases: 178,
    rating: 4.9,
    status: "Active",
    joined: "Feb 14, 2024",
  },
];

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  Active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  Suspended: {
    label: "Suspended",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  Pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
};

const TABS = [
  { label: "All", key: "all", count: 8 },
  { label: "Active", key: "Active", count: 6 },
  { label: "Suspended", key: "Suspended", count: 1 },
  // { label: "Pending", key: "Pending", count: 1 },
];

export default function DesignersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = DESIGNERS.filter((d) => {
    const matchTab = activeTab === "all" || d.status === activeTab;
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dentist</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor all registered dentists on the platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
            <Download size={13} />
            Export
          </Button>
          <Button size="sm" className="gap-2 h-9 text-xs">
            <Plus size={13} />
            Invite Designer
          </Button> */}
        </div>
      </div>

      {/* Stat cards */}
      {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p
                className={`text-3xl font-bold mt-1 ${s.color ?? "text-foreground"}`}
              >
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Table card */}
      <Card className="bg-card border-border">
        {/* Tabs + controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === t.key
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === t.key
                      ? "bg-background/20 text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <svg
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                width="13"
                height="13"
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-52 rounded-lg border border-border bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 text-xs"
                >
                  <SlidersHorizontal size={13} />
                  All Plans
                  <ChevronDown size={11} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem>All Plans</DropdownMenuItem>
                <DropdownMenuItem>Scale</DropdownMenuItem>
                <DropdownMenuItem>Grow</DropdownMenuItem>
                <DropdownMenuItem>Launch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Designer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Location
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Specialty
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Plan
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Cases ↕
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Rating ↕
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Joined
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((d) => {
              const sc = STATUS_CONFIG[d.status];
              return (
                <TableRow
                  key={d.email}
                  className="border-border hover:bg-muted/40 cursor-pointer"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                          {d.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {d.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {d.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      {d.specialties.map((s) => (
                        <span
                          key={s}
                          className="text-xs border border-border rounded px-2 py-0.5 text-foreground bg-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold border rounded px-2.5 py-0.5 ${d.planColor}`}
                    >
                      {d.plan}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {d.cases}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {d.rating}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${sc.className}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {sc.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.joined}
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Projects</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {d.status === "Active" ? (
                          <DropdownMenuItem className="text-red-500 focus:text-red-500">
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-emerald-500 focus:text-emerald-500">
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1–{filtered.length} of {DESIGNERS.length} designers
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-xs"
              disabled
            >
              ‹
            </Button>
            <Button size="sm" className="h-8 w-8 p-0 text-xs">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs">
              ›
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
