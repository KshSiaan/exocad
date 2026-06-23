"use client";

import { ArrowRight, Briefcase, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STATS = [
  { label: "Requested Jobs", value: "03" },
  { label: "Active Jobs", value: "20" },
  { label: "Completed Jobs", value: "12" },
  { label: "Total Earnings", value: "$4,280" },
  { label: "Total Withdraw", value: "$4,280" },
];

const ACTIVE_JOBS = [
  {
    id: "ORD-12847",
    title: "Upper Crown Restoration",
    client: "Olivia Rhye",
    type: "Implantology",
    status: "In Progress",
    updated: "05/04/2024",
  },
  {
    id: "ORD-12847",
    title: "Implant Supported Bridge",
    client: "Phoenix Baker",
    type: "Implantology",
    status: "Revision",
    updated: "05/04/2024",
  },
  {
    id: "ORD-12847",
    title: "Full Denture Set",
    client: "Lana Steiner",
    type: "Implantology",
    status: "Revision",
    updated: "05/04/2024",
  },
  {
    id: "ORD-12847",
    title: "Veneer Set — Anterior",
    client: "Lana Steiner",
    type: "Implantology",
    status: "Submitted",
    updated: "05/04/2024",
  },
];

const COMPLETED_JOBS = [
  {
    id: "ORD-12840",
    title: "All-on-4 Framework",
    client: "Sarah Chen",
    type: "Implantology",
    status: "Paid",
    updated: "04/28/2024",
  },
  {
    id: "ORD-12835",
    title: "PFM Crown Set ×4",
    client: "Marcus Webb",
    type: "Crown & Bridge",
    status: "Paid",
    updated: "04/22/2024",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Revision") {
    return (
      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-200">
        {status}
      </span>
    );
  }
  if (status === "In Progress") {
    return <span className="text-xs font-medium text-amber-500">{status}</span>;
  }
  if (status === "Submitted" || status === "Paid") {
    return (
      <span className="text-xs font-medium text-emerald-600">{status}</span>
    );
  }
  return (
    <span className="text-xs font-medium text-muted-foreground">{status}</span>
  );
}

const COLS = [
  "Project ID",
  "Project Name",
  "Designer",
  "Service Type",
  "Status",
  "Last updated",
  "Action",
];

function JobsTable({
  jobs,
  search,
}: {
  jobs: typeof ACTIVE_JOBS;
  search: string;
}) {
  const filtered = jobs.filter(
    (j) =>
      search === "" ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.client.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl border border-border/60 overflow-hidden mt-4">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            {COLS.map((col) => (
              <TableHead
                key={col}
                className="px-6 text-xs text-muted-foreground font-medium"
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((j, i) => (
            <TableRow key={`${j.id}-${i}`} className="border-border/60">
              <TableCell className="px-6 py-4 font-semibold text-foreground">
                {j.id}
              </TableCell>
              <TableCell className="px-6 py-4 font-medium text-foreground">
                {j.title}
              </TableCell>
              <TableCell className="px-6 py-4 text-muted-foreground">
                {j.client}
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Briefcase size={13} className="shrink-0" />
                  {j.type}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <StatusBadge status={j.status} />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                {j.updated}
              </TableCell>
              <TableCell className="px-6 py-4">
                <Link
                  href={`/designer/projects/${j.id}`}
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                >
                  View <ArrowRight size={11} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function DesignerDashboardPage() {
  const [available, setAvailable] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Availability toggle */}
      {/* <div className="flex items-center gap-2">
        <span
          className={`size-2 rounded-full ${available ? "bg-emerald-500" : "bg-muted-foreground"}`}
        />
        <span className="text-sm font-medium text-foreground">
          {available ? "Available" : "Unavailable"}
        </span>
        <Switch checked={available} onCheckedChange={setAvailable} />
      </div> */}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="bg-white border-border/60 shadow-sm">
            <CardContent className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs */}
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            Active
            <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
              {pad(ACTIVE_JOBS.length)}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
              {pad(COMPLETED_JOBS.length)}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Search — shared across tabs */}
        <div className="mt-4 flex items-center gap-2 bg-white border border-border/60 rounded-xl px-4 py-2.5">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        <TabsContent value="active">
          <JobsTable jobs={ACTIVE_JOBS} search={search} />
        </TabsContent>
        <TabsContent value="completed">
          <JobsTable jobs={COMPLETED_JOBS} search={search} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
