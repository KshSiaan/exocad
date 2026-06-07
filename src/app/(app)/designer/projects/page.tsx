"use client";

import { CheckCircle, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const JOBS = [
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
  {
    id: "PRJ-1040",
    title: "Partial Denture Lower",
    practice: "Oral Care Center",
    type: "Full Arch",
    status: "Completed",
    due: "Jun 4, 2024",
    fee: "$75",
    priority: "Standard",
  },
  {
    id: "PRJ-1039",
    title: "Anterior Veneers ×6",
    practice: "Bright Smiles Dental",
    type: "Veneers",
    status: "Completed",
    due: "Jun 3, 2024",
    fee: "$110",
    priority: "Standard",
  },
  {
    id: "PRJ-1036",
    title: "Full Arch Scan Review",
    practice: "Oral Care Center",
    type: "Full Arch",
    status: "Completed",
    due: "Jun 1, 2024",
    fee: "$65",
    priority: "Standard",
  },
];

const STATUS_STYLES: Record<string, string> = {
  New: "bg-blue-50 text-blue-600 border-blue-200",
  "In Progress": "bg-primary/10 text-primary border-primary/20",
  "Under Review": "bg-amber-50 text-amber-600 border-amber-200",
  Revision: "bg-purple-50 text-purple-600 border-purple-200",
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const PRIORITY_STYLES: Record<string, string> = {
  Rush: "text-red-500",
  Express: "text-amber-600",
  Standard: "text-muted-foreground",
};

const TABS = ["All", "New", "In Progress", "Under Review", "Completed"];

export default function DesignerProjectsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [declined, setDeclined] = useState<string[]>([]);

  const filtered = JOBS.filter((j) => {
    if (declined.includes(j.id)) return false;
    const matchTab = tab === "All" || j.status === tab;
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.practice.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const newJobs = JOBS.filter(
    (j) => j.status === "New" && !declined.includes(j.id),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage all your incoming and active design jobs.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "New Requests",
            value: JOBS.filter((j) => j.status === "New").length,
            icon: Clock,
            color: "text-blue-600",
          },
          {
            label: "Active",
            value: JOBS.filter((j) => j.status === "In Progress").length,
            icon: Clock,
            color: "text-primary",
          },
          {
            label: "Under Review",
            value: JOBS.filter((j) => j.status === "Under Review").length,
            icon: Clock,
            color: "text-amber-600",
          },
          {
            label: "Completed",
            value: JOBS.filter((j) => j.status === "Completed").length,
            icon: CheckCircle,
            color: "text-emerald-600",
          },
        ].map((s) => (
          <Card key={s.label} className="bg-white border-border/60 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
              <s.icon className={`size-5 ${s.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New job requests (prominent) */}
      {newJobs.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
            New Job Requests ({newJobs.length})
          </h2>
          {newJobs.map((j) => (
            <Card
              key={j.id}
              className="bg-blue-50/50 border-blue-200 shadow-sm"
            >
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-muted-foreground">
                      {j.id}
                    </span>
                    <span
                      className={`text-xs font-medium ${PRIORITY_STYLES[j.priority]}`}
                    >
                      · {j.priority}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {j.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {j.practice} · {j.type} · Due {j.due}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-foreground">
                    {j.fee}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => setDeclined((prev) => [...prev, j.id])}
                  >
                    <X size={12} className="mr-1" /> Decline
                  </Button>
                  <Button size="sm" className="h-8 text-xs" asChild>
                    <Link href={`/designer/projects/${j.id}`}>
                      <CheckCircle size={12} className="mr-1" /> Accept
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* All jobs table */}
      <Card className="bg-white border-border/60 shadow-sm">
        <div className="p-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  tab === t
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-56">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 rounded-lg border border-border bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              {[
                "Job",
                "Practice",
                "Type",
                "Priority",
                "Due Date",
                "Fee",
                "Status",
                "",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide first:pl-6"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((j) => (
              <TableRow
                key={j.id}
                className="border-border/60 hover:bg-muted/30"
              >
                <TableCell className="pl-6">
                  <p className="text-sm font-semibold text-foreground">
                    {j.title}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {j.id}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {j.practice}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {j.type}
                </TableCell>
                <TableCell
                  className={`text-xs font-medium ${PRIORITY_STYLES[j.priority]}`}
                >
                  {j.priority}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {j.due}
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">
                  {j.fee}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[j.status]}`}
                  >
                    {j.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/designer/projects/${j.id}`}
                    className="text-xs text-primary hover:underline"
                  >
                    Open →
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="px-6 py-4 border-t border-border/60">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {JOBS.length - declined.length} jobs
          </p>
        </div>
      </Card>
    </div>
  );
}
