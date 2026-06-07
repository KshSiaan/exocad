"use client";

import { Download, MoreHorizontal, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
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

const FILES = [
  {
    name: "full_arch_SC_2847.stl",
    project: "#PRJ-1042",
    practice: "Bright Smiles Dental",
    designer: "Sarah Chen",
    type: "STL",
    size: "18.4 MB",
    uploaded: "Jun 6, 2024",
    status: "Completed",
  },
  {
    name: "implant_bar_ER_1041.stl",
    project: "#PRJ-1041",
    practice: "Premier Orthodontics",
    designer: "Elena Rodriguez",
    type: "STL",
    size: "8.2 MB",
    uploaded: "Jun 5, 2024",
    status: "Pending",
  },
  {
    name: "scan_raw_CE_1040.stl",
    project: "#PRJ-1040",
    practice: "Advanced Periodontics",
    designer: "Marcus Weber",
    type: "STL",
    size: "32.1 MB",
    uploaded: "Jun 4, 2024",
    status: "Completed",
  },
  {
    name: "crown_set_YT_1039.zip",
    project: "#PRJ-1039",
    practice: "City Dental Group",
    designer: "Yuki Tanaka",
    type: "ZIP",
    size: "44.7 MB",
    uploaded: "Jun 4, 2024",
    status: "Pending",
  },
  {
    name: "overdenture_AD_1038.stl",
    project: "#PRJ-1038",
    practice: "Advanced Periodontics",
    designer: "Amara Diallo",
    type: "STL",
    size: "21.3 MB",
    uploaded: "Jun 3, 2024",
    status: "Pending",
  },
  {
    name: "bridge_LN_1043.stl",
    project: "#PRJ-1043",
    practice: "Smile Vision Clinic",
    designer: "Lena Novak",
    type: "STL",
    size: "11.8 MB",
    uploaded: "Jun 3, 2024",
    status: "Completed",
  },
  {
    name: "veneer_set_MW_1037.stl",
    project: "#PRJ-1037",
    practice: "City Dental Group",
    designer: "Marcus Weber",
    type: "STL",
    size: "9.6 MB",
    uploaded: "Jun 2, 2024",
    status: "Completed",
  },
  {
    name: "full_arch_JT_1036.zip",
    project: "#PRJ-1036",
    practice: "Oral Care Center",
    designer: "James Thompson",
    type: "ZIP",
    size: "67.4 MB",
    uploaded: "Jun 1, 2024",
    status: "Completed",
  },
];

const STATUS_CLASS: Record<string, string> = {
  Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

const FILE_TYPE_CLASS: Record<string, string> = {
  STL: "bg-primary/10 text-primary",
  ZIP: "bg-amber-500/10 text-amber-600",
};

const FILTER_TABS = ["All", "Pending", "Completed"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

export default function FilesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("All");

  const filtered = FILES.filter((f) => {
    const matchFilter = filter === "All" || f.status === filter;
    const matchSearch =
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.practice.toLowerCase().includes(search.toLowerCase()) ||
      f.designer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Files</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all uploaded design files across projects.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
          <Download size={13} />
          Export Log
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              {FILTER_TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === t
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative w-64">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                File
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Project
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Practice
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Designer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Size
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Uploaded
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((f) => (
              <TableRow
                key={f.name}
                className="border-border hover:bg-muted/40 cursor-pointer"
              >
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-8 rounded-lg flex items-center justify-center text-xs font-bold ${FILE_TYPE_CLASS[f.type] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {f.type}
                    </div>
                    <span className="text-sm font-medium text-foreground truncate max-w-45">
                      {f.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground">
                  {f.project}
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {f.practice}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.designer}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.size}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.uploaded}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_CLASS[f.status]}`}
                  >
                    {f.status}
                  </span>
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
                      <DropdownMenuItem className="gap-2">
                        <Download size={13} /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 focus:text-red-500 gap-2">
                        <Trash2 size={13} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {FILES.length} files
          </p>
        </div>
      </Card>
    </div>
  );
}
