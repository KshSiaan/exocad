import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  tagline: string;
  price: number;
  period: string;
  cta: string;
  ctaVariant: "primary" | "dark" | "ghost";
  popular?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Launch",
    tagline: "perfect for designers just getting started.",
    price: 49,
    period: "/month",
    cta: "Start Free Trial",
    ctaVariant: "dark",
    features: [
      "Upto 10 Case Leads Per Month",
      "Basic Profile Page",
      "Direct Messaging",
      "Secure file transfer",
      "Email support",
    ],
  },
  {
    name: "Grow",
    tagline: "For established designers ready to scale.",
    price: 129,
    period: "/month",
    cta: "Get Started",
    ctaVariant: "primary",
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
    name: "Scale",
    tagline: "For teams and high-volume designers.",
    price: 39,
    period: "/month",
    cta: "Contact Sales",
    ctaVariant: "ghost",
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

function PlanCard({ plan }: { plan: Plan }) {
  const dark = plan.popular;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-7 flex flex-col",
        dark
          ? "bg-white border-3 border-[#4ecdc4]/60 z-10"
          : "bg-white border border-gray-200/80",
      )}
    >
      {plan.popular && (
        <div className="absolute top-[13px] -right-2 z-10">
          <span className="bg-primary text-foreground text-[11px] font-bold px-3.5 py-1 rounded-tr-xl rounded-l-lg whitespace-nowrap">
            Most Popular
          </span>
          <div className="absolute top-[24px] w-2 h-1.5 right-0 rounded-br-2xl -z-10 bg-[#1e7973]"></div>
        </div>
      )}

      <div className="mb-3">
        <h3
          className={cn(
            "font-bold text-[1.05rem]",
            dark ? "text-background" : "text-gray-900",
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            "text-[12px] mt-1 leading-snug",
            dark ? "text-muted-foreground" : "text-gray-400",
          )}
        >
          {plan.tagline}
        </p>
      </div>

      <div className="flex items-baseline gap-0.5 mb-5">
        <span
          className={cn(
            "text-[2.8rem] font-bold leading-none",
            dark ? "text-background" : "text-gray-900",
          )}
        >
          ${plan.price}
        </span>
        <span
          className={cn(
            "text-[13px] ml-1",
            dark ? "text-muted-foreground" : "text-gray-400",
          )}
        >
          {plan.period}
        </span>
      </div>

      <button
        type="button"
        className={cn(
          "w-full py-2.5 rounded-lg text-[13px] font-semibold transition-colors mb-6",
          plan.ctaVariant === "primary" &&
            "bg-primary text-foreground hover:bg-[#3dbdb4]",
          plan.ctaVariant === "dark" &&
            "bg-[#0d0d1a] text-white border border-gray-800 hover:bg-black",
          plan.ctaVariant === "ghost" &&
            "border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
        )}
      >
        {plan.cta}
      </button>

      <div
        className={cn(
          "border-t pt-5 flex-1",
          dark ? "border-muted/5" : "border-gray-100",
        )}
      >
        <p
          className={cn(
            "text-[11px] font-semibold mb-3.5 uppercase tracking-wide",
            dark ? "text-muted-foreground" : "text-gray-400",
          )}
        >
          What you will get
        </p>
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={13} className="text-primary shrink-0 mt-0.5" />
              <span
                className={cn(
                  "text-[12.5px] leading-snug",
                  dark ? "text-muted-foreground" : "text-gray-600",
                )}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[#4ecdc4] text-xs font-semibold tracking-[0.15em] uppercase mb-3">
            ✦ Pricing
          </p>
          <h2 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight">
            Flexible Pricing Built For
            <br />
            Freelance Exocad Designers
          </h2>
          <p className="text-gray-500 mt-4 text-[13.5px]">
            Choose A Subscription Plan that Matches Your Workflow, Visibility,
            And Growth Goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start pt-4 max-w-sm mx-auto md:max-w-none">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
