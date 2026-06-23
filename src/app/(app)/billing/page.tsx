"use client";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PLAN = {
  name: "Grow",
  price: 129,
  interval: "monthly",
  status: "active" as "active" | "canceled" | "past_due",
  renewsOn: "Jul 23, 2026",
  trialEnds: null as string | null,
  cardBrand: "Visa",
  cardLast4: "4242",
  cardExpiry: "08/27",
};

const INVOICES = [
  { id: "INV-0042", date: "Jun 23, 2026", amount: "$129.00", status: "Paid" },
  { id: "INV-0031", date: "May 23, 2026", amount: "$129.00", status: "Paid" },
  { id: "INV-0019", date: "Apr 23, 2026", amount: "$129.00", status: "Paid" },
];

const FEATURES = [
  "Unlimited case leads",
  "Featured profile placement",
  "Priority matching algorithm",
  "Portfolio showcase page",
  "Analytics dashboard",
  "Priority support",
];

export default function SubscriptionPage() {
  const [canceling, setCanceling] = useState(false);
  const [canceled, setCanceled] = useState(false);

  const statusColor =
    PLAN.status === "active"
      ? "text-emerald-600"
      : PLAN.status === "past_due"
        ? "text-amber-600"
        : "text-red-500";

  const statusDot =
    PLAN.status === "active"
      ? "bg-emerald-500"
      : PLAN.status === "past_due"
        ? "bg-amber-500"
        : "bg-red-500";

  const statusLabel =
    PLAN.status === "active"
      ? "Active"
      : PLAN.status === "past_due"
        ? "Past Due"
        : "Canceled";

  return (
    <div className="space-y-4">
      {/* Page heading — full width */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscription</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your plan, billing, and payment method.
        </p>
      </div>

      {/* Two-column on lg+, single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
        {/* LEFT — Current plan (spans full height) */}
        <div className="bg-white rounded-2xl border border-border/60 p-6 space-y-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Current Plan
              </p>
              <p className="text-xl font-bold text-foreground">{PLAN.name}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                ${PLAN.price}/{PLAN.interval}
              </p>
            </div>
            <span
              className={`flex items-center gap-1.5 text-sm font-semibold ${statusColor}`}
            >
              <span className={`size-2 rounded-full shrink-0 ${statusDot}`} />
              {statusLabel}
            </span>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <CalendarDays
                size={15}
                className="text-muted-foreground shrink-0"
              />
              <div>
                <p className="text-xs text-muted-foreground">
                  {canceled ? "Access until" : "Renews on"}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {PLAN.renewsOn}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={15}
                className="text-muted-foreground shrink-0"
              />
              <div>
                <p className="text-xs text-muted-foreground">
                  Included features
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {FEATURES.length} features
                </p>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 size={13} className="text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Separator />

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <Link href="/subscription?role=dentist">
                <RefreshCw size={13} />
                Change Plan
              </Link>
            </Button>

            {!canceled &&
              (canceling ? (
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm text-muted-foreground">Are you sure?</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50 h-8 px-3 text-xs gap-1"
                    onClick={() => {
                      setCanceled(true);
                      setCanceling(false);
                    }}
                  >
                    <XCircle size={12} />
                    Yes, cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-3 text-xs text-muted-foreground"
                    onClick={() => setCanceling(false)}
                  >
                    Keep plan
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-red-500 gap-1.5"
                  onClick={() => setCanceling(true)}
                >
                  <XCircle size={13} />
                  Cancel Subscription
                </Button>
              ))}

            {canceled && (
              <div className="flex items-center gap-1.5 text-sm text-amber-600">
                <AlertTriangle size={13} />
                Canceled — access until {PLAN.renewsOn}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Payment method + Billing history stacked */}
        <div className="space-y-5">
          {/* Payment method */}
          <div className="bg-white rounded-2xl border border-border/60 p-6 space-y-4">
            <p className="text-sm font-bold text-foreground">Payment Method</p>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
                  <CreditCard size={16} className="text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {PLAN.cardBrand} ending in {PLAN.cardLast4}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires {PLAN.cardExpiry}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                <CreditCard size={13} />
                Update Card
              </Button>
            </div>
          </div>

          {/* Billing history */}
          <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
            <div className="px-5 py-4 border-b border-border/60">
              <p className="text-sm font-bold text-foreground">
                Billing History
              </p>
            </div>
            <div className="divide-y divide-border/60">
              {INVOICES.map((inv) => (
                <div
                  key={inv.id}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3.5 hover:bg-muted/20 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {inv.id}
                    </p>
                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap shrink-0">
                    <span className="text-sm font-semibold text-foreground">
                      {inv.amount}
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {inv.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 text-xs text-muted-foreground"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
