"use client";

import { useState } from "react";
import { Check, Clock, Search, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// ── Data ──────────────────────────────────────────────────────────────────────

type RequestStatus = "Approved" | "Pending" | "Rejected";

interface Request {
  id: string;
  uid: string;
  name: string;
  amount: string;
  reason: string;
  status: RequestStatus;
}

const WITHDRAWAL_REQUESTS: Request[] = [
  {
    id: "ORD-12847",
    uid: "w1",
    name: "Olivia Rhye",
    amount: "$120.00",
    reason: "Olivia Rhye",
    status: "Approved",
  },
  {
    id: "ORD-12847",
    uid: "w2",
    name: "Phoenix Baker",
    amount: "$120.00",
    reason: "Phoenix Baker",
    status: "Pending",
  },
  {
    id: "ORD-12847",
    uid: "w3",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Lana Steiner",
    status: "Rejected",
  },
  {
    id: "ORD-12847",
    uid: "w4",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Lana Steiner",
    status: "Approved",
  },
  {
    id: "ORD-12847",
    uid: "w5",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Lana Steiner",
    status: "Rejected",
  },
  {
    id: "ORD-12847",
    uid: "w6",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Lana Steiner",
    status: "Pending",
  },
  {
    id: "ORD-12847",
    uid: "w7",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Lana Steiner",
    status: "Approved",
  },
];

const REFUND_REQUESTS: Request[] = [
  {
    id: "ORD-12847",
    uid: "r1",
    name: "Olivia Rhye",
    amount: "$120.00",
    reason: "Incorrect design",
    status: "Approved",
  },
  {
    id: "ORD-12847",
    uid: "r2",
    name: "Phoenix Baker",
    amount: "$120.00",
    reason: "Late delivery",
    status: "Pending",
  },
  {
    id: "ORD-12847",
    uid: "r3",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Quality issue",
    status: "Rejected",
  },
  {
    id: "ORD-12847",
    uid: "r4",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Wrong file",
    status: "Approved",
  },
  {
    id: "ORD-12847",
    uid: "r5",
    name: "Lana Steiner",
    amount: "$120.00",
    reason: "Dispute resolved",
    status: "Pending",
  },
];

const TOGGLE_COLORS: Record<RequestStatus, string> = {
  Approved: "bg-emerald-500",
  Pending: "bg-amber-400",
  Rejected: "bg-red-500",
};

const STATUS_TEXT: Record<RequestStatus, string> = {
  Approved: "text-emerald-600",
  Pending: "text-amber-500",
  Rejected: "text-red-600",
};

// ── Status Toggle ─────────────────────────────────────────────────────────────

function StatusToggle({ status }: { status: RequestStatus }) {
  const isOn = status === "Approved";
  const isHalf = status === "Pending";
  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${TOGGLE_COLORS[status]}`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${
            isOn ? "left-5" : isHalf ? "left-3" : "left-0.5"
          }`}
        />
      </div>
      <span className={`text-sm font-medium ${STATUS_TEXT[status]}`}>
        {status}
      </span>
    </div>
  );
}

// ── Table shared ─────────────────────────────────────────────────────────────

function RequestTable({
  rows,
  nameLabel,
}: {
  rows: Request[];
  nameLabel: string;
}) {
  const [statuses, setStatuses] = useState<Record<string, RequestStatus>>(
    Object.fromEntries(rows.map((r) => [r.uid, r.status])),
  );

  function approve(uid: string) {
    setStatuses((s) => ({ ...s, [uid]: "Approved" }));
  }
  function reject(uid: string) {
    setStatuses((s) => ({ ...s, [uid]: "Rejected" }));
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
            Project ID
          </TableHead>
          <TableHead className="text-xs font-medium text-muted-foreground">
            {nameLabel}
          </TableHead>
          <TableHead className="text-xs font-medium text-muted-foreground">
            Amount
          </TableHead>
          <TableHead className="text-xs font-medium text-muted-foreground">
            Reason
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
        {rows.map((r) => (
          <TableRow key={r.uid} className="border-border hover:bg-muted/40">
            <TableCell className="pl-6 text-sm font-medium text-foreground">
              {r.id}
            </TableCell>
            <TableCell className="text-sm text-foreground">{r.name}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {r.amount}
            </TableCell>
            <TableCell className="text-sm text-foreground">
              {r.reason}
            </TableCell>
            <TableCell>
              <StatusToggle status={statuses[r.uid]} />
            </TableCell>
            <TableCell className="pr-6 text-right">
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => approve(r.uid)}
                  className="text-muted-foreground hover:text-emerald-600 transition-colors"
                  title="Approve"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => reject(r.uid)}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                  title="Reject"
                >
                  <X size={16} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Tab = "withdrawal" | "refund";

export default function WalletPage() {
  const [tab, setTab] = useState<Tab>("withdrawal");
  const [search, setSearch] = useState("");

  const rows = tab === "withdrawal" ? WITHDRAWAL_REQUESTS : REFUND_REQUESTS;
  const filtered = rows.filter(
    (r) =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase()),
  );
  const { data, isPending } = useQuery({
    queryKey: ["wallet-info"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        wallet_info: {
          balance: {
            livemode: boolean;
            stripe_pending_amount: number;
            stripe_available_amount: number;
            currency: string;
          };
          wallet_balance: number;
          total_payout: number;
        };
        commission_percentage: {
          key: string;
          value: number;
          note: string;
        };
        min_payout_limit: {
          key: string;
          value: number;
          note: string;
        };
      };
    }> => {
      return howl(`/admin/wallet-info`);
    },
  });
  const { data: refundData, isPending: isRefundPending } = useQuery({
    queryKey: ["refund-requests"],
    queryFn: async () => {
      return howl(`/admin/get-refund-requests`);
    },
  });
  const { data: payoutData, isPending: isPayoutPending } = useQuery({
    queryKey: ["payout-histories"],
    queryFn: async () => {
      return howl(`/admin/get-payout-histories`);
    },
  });

  const STATS = [
    {
      label: "STRIPE PENDING",
      value: `$${data?.data.wallet_info.balance.stripe_pending_amount.toLocaleString()}`,
    },
    {
      label: "STRIPE AVAILABLE",
      value: `$${data?.data.wallet_info.balance.stripe_available_amount.toLocaleString()}`,
    },
    {
      label: "ADMIN PAYOUT BALANCE",
      value: `$${data?.data.wallet_info.wallet_balance.toLocaleString()}`,
    },
    {
      label: "TOTAL ADMIN PAYOUT",
      value: `$${data?.data.wallet_info.total_payout.toLocaleString()}`,
    },
  ];

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
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Escrow Violation Rules */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert size={16} className="text-amber-600 shrink-0" />
          <p className="text-sm font-bold text-amber-700 tracking-wide">
            Escrow Violation Rules
          </p>
        </div>
        <ol className="space-y-2 list-none pl-0">
          <li className="flex gap-2.5 text-sm text-amber-800/80">
            <span className="font-bold text-amber-700 shrink-0">1.</span>
            Do not go to the &apos;Payout Schedule&apos; settings in your Stripe
            admin dashboard. Or do not change this setting. It must be left
            manual.
          </li>
          <li className="flex gap-2.5 text-sm text-amber-800/80">
            <span className="font-bold text-amber-700 shrink-0">2.</span>
            Withdrawals cannot be made from anywhere other than your admin
            dashboard. Even if you make a mistake, withdrawals cannot be made
            from your Stripe main dashboard.
          </li>
        </ol>
      </div>

      {/* Commission setup banner */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
        <div className="size-12 rounded-xl bg-foreground flex items-center justify-center shrink-0">
          <Clock size={20} className="text-background" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground tracking-wide">
            COMMISSION SETUP
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Define the platform percentage fee for each project.
          </p>
        </div>
        <Button variant="outline" className="text-sm h-9 shrink-0">
          Set commission percentage
        </Button>
      </div>

      {/* Search + Tabs */}
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
        <Button
          variant={tab === "withdrawal" ? "outline" : "ghost"}
          className={`h-10 text-sm shrink-0 ${tab === "withdrawal" ? "border-border" : "text-muted-foreground"}`}
          onClick={() => setTab("withdrawal")}
        >
          Withdrawal Requests (Designers)
        </Button>
        <Button
          className={`h-10 text-sm shrink-0 ${tab === "refund" ? "bg-foreground text-background hover:bg-foreground/90" : "bg-foreground text-background hover:bg-foreground/90"}`}
          onClick={() => setTab("refund")}
        >
          Refund Requests (Dentists)
        </Button>
      </div>

      {/* Table */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Request Refund From Dentist</CardTitle>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="pl-6 text-xs font-medium text-muted-foreground">
                    Request ID
                  </TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground">
                    Dentist
                  </TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground">
                    Amount
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
                {rows.map((r) => (
                  <TableRow
                    key={r.uid}
                    className="border-border hover:bg-muted/40"
                  >
                    <TableCell className="pl-6 text-sm font-medium text-foreground">
                      {r.id}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {r.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {r.amount}
                    </TableCell>
                    <TableCell>
                      <StatusToggle status={"Approved"} />
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => approve(r.uid)}
                          className="text-muted-foreground hover:text-emerald-600 transition-colors"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => reject(r.uid)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Admin Payout Histories</CardTitle>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <RequestTable
              key={tab}
              rows={filtered}
              nameLabel={tab === "withdrawal" ? "Designer" : "Dentist"}
            />
            {filtered.length === 0 && (
              <p className="text-center py-10 text-sm text-muted-foreground">
                No requests found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
