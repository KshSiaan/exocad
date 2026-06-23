"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
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
import { DISPUTES, STATUS_STYLES } from "./data";

const STATS = [
  { label: "DISPUTE RESOLUTION CENTER", value: "124" },
  { label: "OPEN", value: "124" },
  { label: "RESOLVED", value: "124" },
  { label: "REFUND PENDING", value: "124" },
];

const STATUS_FILTERS = ["All Status", "Open", "Resolved", "Refund Pending", "Closed"];

export default function DisputesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = DISPUTES.filter((d) => {
    const matchSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.designer.toLowerCase().includes(search.toLowerCase()) ||
      d.dentist.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All Status" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-6">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
                {s.label}
              </p>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
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
        <div className="relative">
          <Button
            variant="outline"
            className="h-10 gap-2 text-sm min-w-[130px] justify-between"
            onClick={() => setDropdownOpen((p) => !p)}
          >
            {statusFilter}
            <ChevronDown size={14} />
          </Button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-10 w-44 rounded-lg border border-border bg-popover shadow-md py-1">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors ${
                    statusFilter === f
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => {
                    setStatusFilter(f);
                    setDropdownOpen(false);
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
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
                  Amount
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Join Date
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground pr-6 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow
                  key={d.uid}
                  className="border-border hover:bg-muted/40"
                >
                  <TableCell className="pl-6 text-sm font-medium text-foreground">
                    {d.id}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {d.designer}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.dentist}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.amount}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {d.date}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border whitespace-nowrap ${STATUS_STYLES[d.status]}`}
                    >
                      {d.status}
                    </span>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => router.push(`/admin/disputes/${d.uid}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="pl-6 py-10 text-center text-sm text-muted-foreground"
                  >
                    No disputes found.
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
