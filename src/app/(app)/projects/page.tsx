"use client";

import { Plus, Search } from "lucide-react";
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

const PROJECTS = [
  {
    id: "PRJ-1042",
    title: "Full Arch Implant Bar",
    designer: "Sarah Chen",
    type: "Implant Bar",
    status: "In Progress",
    due: "Jun 9, 2024",
    price: "$145",
    files: 3,
  },
  {
    id: "PRJ-1041",
    title: "Crown & Bridge #1041",
    designer: "Elena Rodriguez",
    type: "Crown & Bridge",
    status: "Under Review",
    due: "Jun 8, 2024",
    price: "$95",
    files: 2,
  },
  {
    id: "PRJ-1039",
    title: "Anterior Veneers ×6",
    designer: "Yuki Tanaka",
    type: "Veneers",
    status: "Revision",
    due: "Jun 10, 2024",
    price: "$110",
    files: 4,
  },
  {
    id: "PRJ-1038",
    title: "Implant Abutment ×2",
    designer: "Marcus Weber",
    type: "Implants",
    status: "In Progress",
    due: "Jun 11, 2024",
    price: "$120",
    files: 1,
  },
  {
    id: "PRJ-1035",
    title: "All-on-4 Framework",
    designer: "Sarah Chen",
    type: "Full Arch",
    status: "Completed",
    due: "Jun 1, 2024",
    price: "$195",
    files: 5,
  },
  {
    id: "PRJ-1033",
    title: "PFM Crown Set ×4",
    designer: "Marcus Weber",
    type: "Crown & Bridge",
    status: "Completed",
    due: "May 28, 2024",
    price: "$88",
    files: 3,
  },
  {
    id: "PRJ-1030",
    title: "Partial Denture",
    designer: "James Thompson",
    type: "Full Arch",
    status: "Completed",
    due: "May 22, 2024",
    price: "$75",
    files: 2,
  },
  {
    id: "PRJ-1028",
    title: "Implant Bar ×3",
    designer: "Sarah Chen",
    type: "Implant Bar",
    status: "Completed",
    due: "May 15, 2024",
    price: "$210",
    files: 4,
  },
];

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-blue-50 text-blue-600 border-blue-200",
  "Under Review": "bg-amber-50 text-amber-600 border-amber-200",
  Revision: "bg-purple-50 text-purple-600 border-purple-200",
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Cancelled: "bg-red-50 text-red-500 border-red-200",
};

const TABS = ["All", "Active", "Under Review", "Revision", "Completed"];

export default function ProjectsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PROJECTS.filter((p) => {
    const matchTab =
      tab === "All" ||
      (tab === "Active" && p.status === "In Progress") ||
      p.status === tab;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.designer.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            All your dental CAD design orders.
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: PROJECTS.length },
          {
            label: "Active",
            value: PROJECTS.filter((p) => p.status === "In Progress").length,
          },
          {
            label: "Awaiting Review",
            value: PROJECTS.filter((p) => p.status === "Under Review").length,
          },
          {
            label: "Completed",
            value: PROJECTS.filter((p) => p.status === "Completed").length,
          },
        ].map((s) => (
          <Card key={s.label} className="bg-white border-border/60 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white border-border/60 shadow-sm">
        {/* Toolbar */}
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
          <div className="relative w-full sm:w-60">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search projects..."
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
                "Project",
                "Type",
                "Designer",
                "Due Date",
                "Files",
                "Amount",
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
            {filtered.map((p) => (
              <TableRow
                key={p.id}
                className="border-border/60 hover:bg-muted/30 cursor-pointer"
              >
                <TableCell className="pl-6">
                  <p className="text-sm font-semibold text-foreground">
                    {p.title}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {p.id}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.type}
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {p.designer}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.due}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.files} files
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">
                  {p.price}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[p.status]}`}
                  >
                    {p.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/projects/${p.id}`}
                    className="text-xs text-primary hover:underline"
                  >
                    View →
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="px-6 py-4 border-t border-border/60 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {PROJECTS.length} projects
          </p>
          <div className="flex gap-1">
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
