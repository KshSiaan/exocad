"use client";

import {
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

const PLAN_DETAILS: Record<string, { name: string; price: number }> = {
  launch: { name: "Launch", price: 49 },
  grow: { name: "Grow", price: 129 },
  scale: { name: "Scale", price: 299 },
};

function formatCardNumber(val: string) {
  return val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  return digits;
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") ?? "grow";
  const role = searchParams.get("role") ?? "dentist";
  const plan = PLAN_DETAILS[planId] ?? PLAN_DETAILS.grow;

  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = card.replace(/\s/g, "").length === 16 && expiry.length >= 7 && cvc.length >= 3 && name.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/payment/success?role=${role}`);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <Link href="/">
          <span className={cn("text-xl font-bold text-gray-900", outfit.className)}>
            exo connect
          </span>
        </Link>
        <span className="text-xs text-gray-400">Step 3 of 3 — Payment</span>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-lg">
          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 mb-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-900">
                {plan.name} Plan — Monthly
              </p>
              <p className="text-lg font-bold text-gray-900">${plan.price}/mo</p>
            </div>
            <p className="text-xs text-gray-400">14-day free trial. Cancel anytime.</p>
          </div>

          {/* Card form */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={16} className="text-gray-400" />
              <p className="text-sm font-semibold text-gray-900">Payment Details</p>
              <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-400">
                <Lock size={11} />
                Secured by Stripe
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-600">Cardholder Name</Label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                  autoComplete="cc-name"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-600">Card Number</Label>
                <div className="relative">
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={card}
                    onChange={(e) => setCard(formatCardNumber(e.target.value))}
                    className="h-11 pr-12 font-mono tracking-wider"
                    autoComplete="cc-number"
                    inputMode="numeric"
                  />
                  <CreditCard size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">Expiry Date</Label>
                  <Input
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="h-11 font-mono"
                    autoComplete="cc-exp"
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-600">CVC</Label>
                  <Input
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="h-11 font-mono"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                  />
                </div>
              </div>

              {/* Dummy Stripe Element placeholder */}
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-3 flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary shrink-0" />
                <p className="text-[11px] text-gray-400">
                  Your payment info is encrypted and never stored on our servers.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-sm font-semibold"
                disabled={!canSubmit || loading}
              >
                {loading ? "Processing…" : `Pay $${plan.price} / month`}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            By subscribing you agree to our{" "}
            <Link href="#" className="underline underline-offset-2">Terms</Link>
            {" "}and{" "}
            <Link href="#" className="underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
