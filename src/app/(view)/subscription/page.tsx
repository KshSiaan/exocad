"use client";

import { Check } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string;
  cta: string;
  popular?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "Perfect for designers just getting started.",
    price: 49,
    period: "/month",
    cta: "Start Free Trial",
    features: [
      "Upto 10 Case Leads Per Month",
      "Basic Profile Page",
      "Direct Messaging",
      "Secure file transfer",
      "Email support",
    ],
  },
  {
    id: "grow",
    name: "Grow",
    tagline: "For established designers ready to scale.",
    price: 129,
    period: "/month",
    cta: "Get Started",
    popular: true,
    features: [
      "Unlimited case leads",
      "Featured profile placement",
      "Priority matching algorithm",
      "Portfolio showcase page",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For teams and high-volume designers.",
    price: 299,
    period: "/month",
    cta: "Contact Sales",
    features: [
      "Everything in Grow",
      "Team accounts (up to 5)",
      "Top placement in search",
      "Dedicated account manager",
      "Custom branding options",
      "API access",
    ],
  },
];

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  const dark = plan.popular;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-7 flex flex-col transition-all",
        dark
          ? "bg-white border-2 border-primary/60 z-10 shadow-xl shadow-primary/10"
          : "bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-md",
      )}
    >
      {plan.popular && (
        <div className="absolute top-[13px] -right-2 z-10">
          <span className="bg-primary text-foreground text-[11px] font-bold px-3.5 py-1 rounded-tr-xl rounded-l-lg whitespace-nowrap">
            Most Popular
          </span>
          <div className="absolute top-[24px] w-2 h-1.5 right-0 rounded-br-2xl -z-10 bg-[#1e7973]" />
        </div>
      )}

      <div className="mb-3">
        <h3 className="font-bold text-[1.05rem] text-gray-900">{plan.name}</h3>
        <p className="text-[12px] mt-1 leading-snug text-gray-400">
          {plan.tagline}
        </p>
      </div>

      <div className="flex items-baseline gap-0.5 mb-5">
        <span className="text-[2.8rem] font-bold leading-none text-gray-900">
          ${plan.price}
        </span>
        <span className="text-[13px] ml-1 text-gray-400">{plan.period}</span>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "w-full py-2.5 rounded-lg text-[13px] font-semibold transition-colors mb-6",
          plan.popular
            ? "bg-primary text-foreground hover:bg-[#3dbdb4]"
            : "bg-[#0d0d1a] text-white border border-gray-800 hover:bg-black",
        )}
      >
        {plan.cta}
      </button>

      <div className="border-t border-gray-100 pt-5 flex-1">
        <p className="text-[11px] font-semibold mb-3.5 uppercase tracking-wide text-gray-400">
          What you will get
        </p>
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={13} className="text-primary shrink-0 mt-0.5" />
              <span className="text-[12.5px] leading-snug text-gray-600">
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SubscriptionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role") ?? "dentist";

  const handleSelect = (planId: string) => {
    router.push(`/payment?plan=${planId}&role=${role}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <Link href="/">
          <span
            className={cn("text-xl font-bold text-gray-900", outfit.className)}
          >
            exo connect
          </span>
        </Link>
        <span className="text-xs text-gray-400">
          Step 2 of 3 — Choose your plan
        </span>
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              ✦ Subscription
            </p>
            <h1
              className={cn(
                "text-[2rem] sm:text-4xl font-bold text-gray-900 leading-tight",
                outfit.className,
              )}
            >
              Choose your plan
            </h1>
            <p className="text-gray-500 mt-3 text-[13.5px]">
              {role === "designer"
                ? "Unlock more leads, visibility, and tools as you grow."
                : "Pick the plan that fits your practice size and needs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start max-w-sm mx-auto md:max-w-none">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={() => handleSelect(plan.id)}
              />
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-10">
            No commitment — cancel anytime. All plans include a 14-day free
            trial.
          </p>
        </div>
      </main>
    </div>
  );
}
