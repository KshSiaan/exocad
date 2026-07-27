"use client";

import { ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ViewJob from "./view-job";
import ActionJobReq from "./action-job-req";

export default function DesignerProjectsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const {
    data: jobsData,
    isPending: isJobsPending,
    refetch,
  } = useQuery({
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
  const { data: workingJobsData, refetch: refetchWorkingJobs } = useQuery({
    queryKey: ["designer-jobs", tab, search],
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
      const res = await howl(
        `/designer/get-jobs?per_page=12&page=1&project_status=${tab === "All" ? "" : tab}&search=${search}`,
      );
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
                    ${j.service_price}
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-4 justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            // href={`/designer/projects/${j.id}/files`}
                            className="text-xs font-medium text-primary hover:underline flex items-center gap-1 whitespace-nowrap"
                          >
                            Files View <ArrowRight size={11} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white h-[90dvh] min-w-[90dvw]">
                          <DialogHeader className="hidden">
                            <DialogTitle></DialogTitle>
                          </DialogHeader>
                          <ViewJob j={j} />
                        </DialogContent>
                      </Dialog>
                      <ActionJobReq
                        id={j.id}
                        refetch={() => {
                          refetch();
                          refetchWorkingJobs();
                        }}
                      />
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
            {[
              "All",
              "in_progress",
              "submitted",
              "revision",
              "resubmitted",
              "completed",
              "disputed",
              "disputed_closed",
            ].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors capitalize ${
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
              {["Job", "Practice", "Due Date", "Fee", "Status", ""].map((h) => (
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
            {workingJobsData?.data?.data.map((j) => (
              <TableRow
                key={j.id}
                className="border-border/60 hover:bg-muted/30"
              >
                <TableCell className="pl-6">
                  <p className="text-sm font-semibold text-foreground">
                    {j.project_title}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {j.id}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {j.service_name}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(j.project_status_changed_at).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">
                  {j.service_price ? `$${j.service_price}` : "-"}
                </TableCell>
                <TableCell className={`text-xs font-medium `}>
                  <Badge>{j.project_status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          // href={`/designer/projects/${j.id}/files`}
                          className="text-xs font-medium text-primary hover:underline flex items-center gap-1 whitespace-nowrap"
                        >
                          Files View <ArrowRight size={11} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white h-[90dvh] min-w-[90dvw]">
                        <DialogHeader className="hidden">
                          <DialogTitle></DialogTitle>
                        </DialogHeader>
                        <ViewJob j={j} />
                      </DialogContent>
                    </Dialog>
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
          </TableBody>
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
