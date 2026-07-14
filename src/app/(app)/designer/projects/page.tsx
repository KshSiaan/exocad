"use client";

import { ArrowRight, CheckCircle, Clock, Search, X } from "lucide-react";
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
import { howl } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

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
  const { data: jobsData, isPending: isJobsPending } = useQuery({
    queryKey: ["designer-job_requests"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        current_page: number;
        data: Array<{
          id: number;
          project_number: string;
          dentist_id: number;
          project_title: string;
          project_description: string;
          designer_id: number;
          service_name: string;
          service_price: string;
          project_status: string;
          project_status_changed_at: string;
          payment_status: string;
          dentist_scan_files: Array<string>;
          designer_submitted_files: any;
          designer_payout_status: any;
          comments: any;
          payment_type: string;
          created_at: string;
          updated_at: string;
          deleted_at: any;
        }>;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: Array<{
          url?: string;
          label: string;
          page?: number;
          active: boolean;
        }>;
        next_page_url: any;
        path: string;
        per_page: number;
        prev_page_url: any;
        to: number;
        total: number;
      };
    }> => {
      const res = await howl("/designer/get-job-requests?per_page=12&page=1");
      return res as any;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage all your incoming and active design jobs.
        </p>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "New Requests",
            value: jobsData?.data?.total || 0,
            icon: Clock,
            color: "text-blue-600",
          },
          {
            label: "Active",
            value: jobsData?.data?.total || 0,
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
      </div> */}

      {/* New job requests */}
      {
        <Card className="bg-white border-border/60 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
              <p className="text-sm font-semibold text-foreground">
                Incoming Job Requests
              </p>
              <span className="text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">
                {jobsData?.data?.total} new
              </span>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent bg-muted/30">
                {["Job", "Practice", "Priority", "Due", "Fee", "Actions"].map(
                  (h) => (
                    <TableHead
                      key={h}
                      className="text-[10px] text-center font-semibold uppercase tracking-widest text-muted-foreground first:pl-5 last:pr-5"
                    >
                      {h}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobsData?.data?.data.map((j) => (
                <TableRow
                  key={j.id}
                  className="border-border/60 hover:bg-muted/20"
                >
                  <TableCell className="pl-5 py-4 text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {j.project_title}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      #{j.id}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground text-center">
                    {j.service_name}
                  </TableCell>
                  <TableCell className={`text-xs text-center font-semibold`}>
                    <Badge>{j.project_status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground text-center">
                    {j.payment_status}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-foreground text-center">
                    {j.service_price}
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2 justify-center">
                      <Link
                        href={`/designer/projects/${j.id}/files`}
                        className="text-xs font-medium text-primary hover:underline flex items-center gap-1 whitespace-nowrap"
                      >
                        Files View <ArrowRight size={11} />
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs text-red-500 border-red-200 hover:bg-red-50"
                        // onClick={() => setDeclined((prev) => [...prev, j.id])}
                      >
                        Decline
                      </Button>
                      <Button size="sm" className="h-7 px-3 text-xs" asChild>
                        <Link href={`/designer/projects/${j.id}`}>Accept</Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      }

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
          {/* <TableBody>
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
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/designer/projects/${j.id}`}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      Files View <ArrowRight size={11} />
                    </Link>
                    <Link
                      href={`/designer/projects/${j.id}`}
                      className="text-xs text-muted-foreground hover:underline"
                    >
                      Open →
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>

        <div className="px-6 py-4 border-t border-border/60">
          <p className="text-sm text-muted-foreground">
            Showing {jobsData?.data?.current_page} of {jobsData?.data?.total}{" "}
            jobs
          </p>
        </div>
      </Card>
    </div>
  );
}
