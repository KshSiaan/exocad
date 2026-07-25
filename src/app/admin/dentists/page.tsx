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
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/api";

const TABS = [
  { label: "All", key: "all", count: 8 },
  { label: "Active", key: "Active", count: 6 },
  { label: "Suspended", key: "Suspended", count: 1 },
];

export default function DesignersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const { data } = useQuery({
    queryKey: ["designers", activeTab, search, page, levelFilter],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        current_page: number;
        data: Array<{
          id: number;
          full_name: string;
          role: string;
          email: string;
          email_verified_at: string;
          status: string;
          otp_verified_at: any;
          otp: any;
          otp_expires_at: any;
          avatar: any;
          stripe_connect_id: any;
          is_trail_used: number;
          google_id: any;
          timezone: any;
          login_status: number;
          last_active: any;
          created_at: string;
          updated_at: string;
          deleted_at: any;
          avatar_url: string;
          profile: {
            id: number;
            user_id: number;
            professional_title: any;
            specializations: any;
            availability: boolean;
            level: any;
            bio: any;
            clinic_name: any;
            about_for_designer: any;
            wallet_balance: string;
            contact_email_address: any;
            address: any;
            phone_number: any;
            created_at: string;
            updated_at: string;
          };
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
      return howl(
        `/admin/get-users?role=DENTIST&status=${activeTab === "all" ? "" : activeTab}&level=${levelFilter ?? ""}&per_page=12&page=${page}`,
      );
    },
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dentiests</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor all registered CAD designers on the platform.
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
                {/* <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === t.key
                      ? "bg-background/20 text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t.count}
                </span> */}
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
                placeholder="Search dentiests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-52 rounded-lg border border-border bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
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
                Contact Number
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Projects
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
            {data?.data?.data?.map((d) => {
              return (
                <TableRow
                  key={d.email}
                  className="border-border hover:bg-muted/40 cursor-pointer"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                          {d.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {d.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {d.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.profile?.address || "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      {d.profile?.phone_number || "N/A"}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">{"N/A"}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${d.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500" : "bg-red-500/10 text-red-500 border-red-500"}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {d.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(d.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {data?.data?.from ?? 0}–{data?.data?.to ?? 0} of{" "}
            {data?.data?.total ?? 0} designers
          </p>

          <div className="flex items-center gap-1">
            {/* Previous */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-xs"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </Button>

            {/* Page Numbers */}
            {Array.from(
              { length: data?.data?.last_page ?? 1 },
              (_, i) => i + 1,
            ).map((pageNumber) => (
              <Button
                key={pageNumber}
                size="sm"
                variant={page === pageNumber ? "default" : "outline"}
                className="h-8 w-8 p-0 text-xs"
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}

            {/* Next */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-xs"
              disabled={page === (data?.data?.last_page ?? 1)}
              onClick={() =>
                setPage((p) => Math.min(data?.data?.last_page ?? 1, p + 1))
              }
            >
              ›
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
