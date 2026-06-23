"use client";

import { useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

// ── Data ──────────────────────────────────────────────────────────────────────

type ProjectStatus =
  | "Pending"
  | "In progress"
  | "Submitted"
  | "Revision"
  | "Resubmit"
  | "Completed"
  | "Disputed";

interface Project {
  id: string;
  designer: string;
  dentist: string;
  serviceType: string;
  amount: string;
  joinDate: string;
  status: ProjectStatus;
}

const PROJECTS: Project[] = [
  {
    id: "ORD-12847",
    designer: "Olivia Rhye",
    dentist: "Olivia Rhye",
    serviceType: "Implantology",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Pending",
  },
  {
    id: "ORD-12848",
    designer: "Phoenix Baker",
    dentist: "Phoenix Baker",
    serviceType: "Orthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "In progress",
  },
  {
    id: "ORD-12849",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Prosthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Submitted",
  },
  {
    id: "ORD-12850",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Implantology",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Revision",
  },
  {
    id: "ORD-12851",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Orthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Resubmit",
  },
  {
    id: "ORD-12852",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Prosthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Completed",
  },
  {
    id: "ORD-12853",
    designer: "Lana Steiner",
    dentist: "Lana Steiner",
    serviceType: "Implantology",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Disputed",
  },
  {
    id: "ORD-12854",
    designer: "Marcus Weber",
    dentist: "Marcus Weber",
    serviceType: "Orthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Pending",
  },
  {
    id: "ORD-12855",
    designer: "Sarah Chen",
    dentist: "Sarah Chen",
    serviceType: "Prosthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Completed",
  },
  {
    id: "ORD-12856",
    designer: "Yuki Tanaka",
    dentist: "Yuki Tanaka",
    serviceType: "Implantology",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "In progress",
  },
  {
    id: "ORD-12857",
    designer: "Elena Rodriguez",
    dentist: "Elena Rodriguez",
    serviceType: "Orthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Submitted",
  },
  {
    id: "ORD-12858",
    designer: "James Thompson",
    dentist: "James Thompson",
    serviceType: "Prosthodontics",
    amount: "$120.00",
    joinDate: "05/04/2024",
    status: "Disputed",
  },
];

const ALL_TABS = [
  "Total",
  "Pending",
  "In progress",
  "Submitted",
  "Revision",
  "Resubmit",
  "Completed",
  "Disputed",
] as const;

type Tab = (typeof ALL_TABS)[number];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FilesPage() {
  const [tab, setTab] = useState<Tab>("Total");
  const [search, setSearch] = useState("");

  const counts = Object.fromEntries(
    ALL_TABS.map((t) => [
      t,
      t === "Total"
        ? PROJECTS.length
        : PROJECTS.filter((p) => p.status === t).length,
    ]),
  ) as Record<Tab, number>;

  const filtered = PROJECTS.filter((p) => {
    const matchTab = tab === "Total" || p.status === tab;
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      p.id.toLowerCase().includes(q) ||
      p.designer.toLowerCase().includes(q) ||
      p.dentist.toLowerCase().includes(q) ||
      p.serviceType.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto pb-0">
        {ALL_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                tab === t
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <Card className="bg-card border-border">
        <CardContent className="px-0 py-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
                  Project ID
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Designer
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Dentist
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Service Type
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Amount
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Join Date
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground pr-6 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow
                  key={p.id + p.designer}
                  className="border-border hover:bg-muted/40"
                >
                  <TableCell className="pl-6 text-sm font-medium text-foreground">
                    {p.id}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {p.designer}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {p.dentist}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className="size-4 rounded-sm bg-muted inline-block" />
                      {p.serviceType}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {p.amount}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {p.joinDate}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
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
                        <DropdownMenuItem>View Project</DropdownMenuItem>
                        <DropdownMenuItem>View Designer</DropdownMenuItem>
                        <DropdownMenuItem>View Dentist</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="pl-6 py-10 text-center text-sm text-muted-foreground"
                  >
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
