"use client";

import { CheckCircle2 } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "dentist";
  const dashboard = role === "designer" ? "/designer/dashboard" : "/dashboard";

  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      window.location.href = dashboard;
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, dashboard]);

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="size-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <h1 className={cn("text-2xl font-bold text-gray-900", outfit.className)}>
            You&apos;re all set!
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your subscription is active. Welcome to ExoConnect —{" "}
            {role === "designer"
              ? "start browsing job leads and building your profile."
              : "post your first case and get matched with a designer."}
          </p>
        </div>

        {/* Confirmation card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 text-left space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Status</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
              Active
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Account type</span>
            <span className="text-gray-900 font-medium capitalize">{role === "designer" ? "CAD Designer" : "Dental Practice"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Next billing</span>
            <span className="text-gray-900 font-medium">
              {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full h-11 text-sm font-semibold" asChild>
          <Link href={dashboard}>Go to Dashboard</Link>
        </Button>

        <p className="text-xs text-gray-400">
          Redirecting automatically in {count}s…
        </p>
      </div>
    </div>
  );
}
