"use client";

import { CheckCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BALANCE = { amount: "$1,240", label: "Available funds" };

const REQUESTS = [
  {
    id: "REF-2026-001",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Pending",
    note: "Under admin review",
  },
  {
    id: "REF-2026-001",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Rejected",
    note: "Insufficient Stripe balance at time of request",
  },
  {
    id: "REF-2026-001",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Rejected",
    note: "Transfer initiated",
  },
  {
    id: "REF-2026-001",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Paid",
    note: "Completed successfully",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-500 border border-amber-200",
  Rejected: "bg-red-50 text-red-500 border border-red-200",
  Paid: "bg-emerald-50 text-emerald-600 border border-emerald-200",
};

export default function WalletPage() {
  return (
    <div className="space-y-6">
      {/* Top cards */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Balance card */}
        <div className="sm:w-64 shrink-0 bg-white rounded-2xl border border-border/60 p-6 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Total Refundable Amount
          </p>
          <p className="text-4xl font-bold text-foreground">{BALANCE.amount}</p>
          <p className="text-sm text-muted-foreground">{BALANCE.label}</p>
        </div>

        {/* Refund request card */}
        <div className="flex-1 bg-white rounded-2xl border border-border/60 p-6 relative">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-foreground">
                Request a Refund
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                If you no longer wish to continue working on the platform, you
                can request a refund of your remaining available balance.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 whitespace-nowrap">
              <CheckCircle size={13} className="shrink-0" />
              Refund Available — Sufficient Stripe Balance
            </span>
          </div>
          <Button className="mt-5 gap-2 bg-foreground text-background hover:bg-foreground/90 text-sm">
            <DollarSign size={14} />
            Request Refund
          </Button>
        </div>
      </div>
      <div className="">
        <h2 className="text-xl font-bold text-foreground">
          Refund Request Table
        </h2>
        <p className="text-xs text-muted-foreground/50">
          your submitted refund request with timeline
        </p>
      </div>
      {/* Refund history table */}
      <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60">
              {[
                "Request ID",
                "Req Amount",
                "Request date",
                "Status",
                "Admin Notes",
              ].map((col) => (
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
            {REQUESTS.map((r, i) => (
              <TableRow key={`${r.id}-${i}`} className="border-border/60">
                <TableCell className="px-6 py-4 font-semibold text-foreground">
                  {r.id}
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground">
                  {r.amount}
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground">
                  {r.date}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUS_STYLES[r.status]}`}
                  >
                    {r.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 font-medium text-foreground">
                  {r.note}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
