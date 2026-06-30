"use client";

import {
  AlertCircle,
  BellIcon,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  MoreHorizontal,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROJECTS = [
  {
    id: "#PRJ-1042",
    practice: "Bright Smiles Dental",
    dentist: "Dr. Michael Lee",
    designer: "Sarah Chen",
    type: "Full Arch Restoration",
    files: 3,
    status: "In Progress",
    due: "Jun 12, 2024",
    amount: "$380",
  },
  {
    id: "#PRJ-1041",
    practice: "Premier Orthodontics",
    dentist: "Dr. James Whitfield",
    designer: "Elena Rodriguez",
    type: "Implant Bar",
    files: 2,
    status: "Review",
    due: "Jun 10, 2024",
    amount: "$290",
  },
  {
    id: "#PRJ-1040",
    practice: "Advanced Periodontics",
    dentist: "Dr. Chris Evans",
    designer: "Marcus Weber",
    type: "Crown Set × 4",
    files: 4,
    status: "Completed",
    due: "Jun 5, 2024",
    amount: "$480",
  },
  {
    id: "#PRJ-1039",
    practice: "City Dental Group",
    dentist: "Dr. Rachel Kim",
    designer: "Yuki Tanaka",
    type: "Veneer Set × 6",
    files: 1,
    status: "Pending",
    due: "Jun 15, 2024",
    amount: "$540",
  },
  {
    id: "#PRJ-1038",
    practice: "Advanced Periodontics",
    dentist: "Dr. Chris Evans",
    designer: "Amara Diallo",
    type: "Overdenture",
    files: 2,
    status: "Revision",
    due: "Jun 8, 2024",
    amount: "$320",
  },
];

const STATUS_CONFIG: Record<string, { className: string }> = {
  "In Progress": {
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  Review: { className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  Completed: {
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  Pending: { className: "bg-muted text-muted-foreground border-border" },
  Revision: {
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
};

const PROJECT_STATUS_ICON: Record<string, React.ReactNode> = {
  "In Progress": <RefreshCw size={11} className="text-blue-500" />,
  Review: <AlertCircle size={11} className="text-amber-500" />,
  Completed: <CheckCircle2 size={11} className="text-emerald-500" />,
  Pending: <Clock size={11} className="text-muted-foreground" />,
  Revision: <RefreshCw size={11} className="text-purple-500" />,
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  const filtered = PROJECTS.filter(
    (p) =>
      !search ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.practice.toLowerCase().includes(search.toLowerCase()) ||
      p.designer.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor all CAD design projects across the platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
            <Download size={13} />
            Export
          </Button>
          <Button size="sm" className="gap-2 h-9 text-xs">
            <Plus size={13} />
            New Project
          </Button> */}
        </div>
      </div>
      <Card>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="">
            <div className="p-3 rounded-lg bg-muted">
              <BellIcon />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex gap-2 items-center-safe">
              <h4 className="text-lg font-bold">Auto-Delete CAD Files</h4>
              <Badge className="">Storage Save</Badge>
            </div>
            <Select defaultValue="item-1">
              <SelectTrigger className="min-w-40">
                <SelectValue placeholder="Select day limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="item-1">5 Days</SelectItem>
                <SelectItem value="item-1">7 Days</SelectItem>
                <SelectItem value="item-1">20 Days</SelectItem>
                <SelectItem value="item-2">30 Days</SelectItem>
                <SelectItem value="item-2">60 Days</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Automatically remove old project files from AWS S3 server storage
              space to free up storage.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base font-semibold">
              All Projects
            </CardTitle>
            <div className="relative flex-1 max-w-sm ml-auto">
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
                placeholder="Search projects..."
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
                Project
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Practice
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Designer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Type
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Files
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Due
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Amount
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow
                key={p.id}
                className="border-border hover:bg-muted/40 cursor-pointer"
              >
                <TableCell className="pl-6 text-sm font-mono text-foreground">
                  {p.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {p.practice}
                    </p>
                    <p className="text-xs text-muted-foreground">{p.dentist}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.designer}
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {p.type}
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {p.files} file{p.files !== 1 ? "s" : ""}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.due}
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">
                  {p.amount}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_CONFIG[p.status].className}`}
                  >
                    {PROJECT_STATUS_ICON[p.status]}
                    {p.status}
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
                      <DropdownMenuItem>View Project</DropdownMenuItem>
                      <DropdownMenuItem>Download Files</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 focus:text-red-500">
                        Cancel Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {PROJECTS.length} projects
          </p>
        </div>
      </Card>
    </div>
  );
}
