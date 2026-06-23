"use client";

import { AlertTriangle, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BALANCE = 84.0;
const MIN_WITHDRAWAL = 100;

const PAYOUT_REQUESTS = [
  {
    id: "#REQ-9902",
    type: "Final Payout (Exit)",
    amount: "$84.00",
    date: "16 Jun, 2026",
    status: "Under Admin Review",
  },
  {
    id: "#REQ-8451",
    type: "Standard Payout",
    amount: "$150.00",
    date: "22 May, 2026",
    status: "Paid & Completed",
  },
  {
    id: "#REQ-7823",
    type: "Standard Payout",
    amount: "$320.00",
    date: "10 Apr, 2026",
    status: "Paid & Completed",
  },
];

const PAYOUT_INTERVALS = ["Manual Payout", "Weekly", "Bi-weekly", "Monthly"];

export default function DesignerWalletPage() {
  const [amount, setAmount] = useState("");
  const [interval, setInterval] = useState("Manual Payout");
  const canWithdraw = BALANCE >= MIN_WITHDRAWAL;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
      {/* Left */}
      <div className="space-y-6">
        {/* Balance + withdraw form */}
        <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
          {/* Dark hero */}
          <div className="bg-foreground px-6 py-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-2">
              Total Withdrawable Amount
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-bold text-white">
                ${BALANCE.toFixed(2)}
              </p>
              <span className="text-sm font-medium text-white/50">USD</span>
            </div>
            {!canWithdraw && (
              <div className="mt-4 inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-lg">
                <AlertTriangle size={12} />
                Minimum $100 withdraw limited
              </div>
            )}
          </div>

          {/* Withdraw input */}
          <div className="px-6 py-5">
            <p className="text-sm font-medium text-foreground mb-3">
              Enter Amount to Withdraw
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 border border-border rounded-xl px-4 py-2.5">
                <span className="text-sm text-muted-foreground">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button
                disabled={
                  !canWithdraw || !amount || parseFloat(amount) < MIN_WITHDRAWAL
                }
                className="px-6 h-10 text-sm font-semibold"
              >
                Payout
              </Button>
            </div>
          </div>
        </div>

        {/* Final payout */}
        {/* <div className="bg-white rounded-2xl border border-border/60 p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <h2 className="text-sm font-bold text-foreground">
              Request Final Payout (Exit Platform)
            </h2>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
              Available for Final Payout
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 max-w-lg">
            If you don&apos;t want to work and can leave the platform, click the
            &ldquo;Request Final Payout&rdquo; button to get your remaining
            money back. Admin will manually process and approve your refund
            request.
          </p>
          <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm">
            <LogOut size={14} />
            Request Final Payout
          </Button>
        </div> */}

        {/* Payout request table */}
        <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/60">
            <p className="text-sm font-bold text-foreground">
              Payout Request Table
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your standard and final payout request tracking list.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                {["Request ID", "Type", "Amount", "Date", "Status"].map(
                  (col) => (
                    <TableHead
                      key={col}
                      className="px-6 text-xs text-muted-foreground font-semibold uppercase tracking-wide"
                    >
                      {col}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYOUT_REQUESTS.map((p) => (
                <TableRow key={p.id} className="border-border/60">
                  <TableCell className="px-6 py-4 font-bold text-foreground">
                    {p.id}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {p.type === "Final Payout (Exit)" ? (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        {p.type}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-foreground border border-border/60 px-2.5 py-0.5 rounded-full">
                        {p.type}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold text-foreground">
                    {p.amount}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                    {p.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {p.status === "Paid & Completed" ? (
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                        <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {p.status}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                        <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                        {p.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Right — schedule settings */}
      <div className="bg-white rounded-2xl border border-border/60 p-6 space-y-4">
        <h2 className="text-sm font-bold text-foreground">
          Payout Schedule Setting
        </h2>
        <div className="space-y-1.5">
          <label
            htmlFor="payout-interval"
            className="text-xs text-muted-foreground font-medium"
          >
            Payout Interval
          </label>
          <select
            id="payout-interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {PAYOUT_INTERVALS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <Button className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold text-sm">
          Save Schedule Settings
        </Button>
      </div>
    </div>
  );
}
