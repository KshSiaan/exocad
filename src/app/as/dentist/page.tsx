import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Quote,
  Smile,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const BENEFITS = [
  {
    icon: Users,
    title: "Scale Without Hiring",
    body: "Access expert CAD talent only when you need it — no overhead, no commitment. Grow your caseload without growing your payroll.",
  },
  {
    icon: Clock,
    title: "Faster Turnaround Times",
    body: "Keep cases moving and patients happy. Designs come back quickly so your workflow never stalls waiting on a bottleneck.",
  },
  {
    icon: Star,
    title: "Higher-Quality Restorations",
    body: "Work with experienced designers who deeply understand esthetics, function, and manufacturability. The difference shows up chairside.",
  },
  {
    icon: CheckCircle2,
    title: "Fewer Remakes & Adjustments",
    body: "Better designs mean more predictable outcomes. Reduce chair time, patient callbacks, and the frustration that comes with ill-fitting restorations.",
  },
  {
    icon: TrendingUp,
    title: "Expand Your Digital Capabilities",
    body: "Take on more veneer, crown, implant, and full-arch cases with confidence — even without an in-house design team.",
  },
  {
    icon: Smile,
    title: "Focus on Patient Care",
    body: "Spend less time designing and more time treating. ExoConnect handles the design layer so you can focus on what you do best.",
  },
];

export default function DentistPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-end bg-[#0d0d1a] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('/img/header.webp')` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
        <div className="relative z-10 px-6 lg:px-16 py-16 max-w-3xl">
          <p className="text-[#4ecdc4] text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            ✦ For Dentists
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight">
            Your Design Workflow
            <br />
            Shouldn&apos;t Be a Bottleneck.
          </h1>
          <p className="mt-5 text-white/60 text-[15px] sm:text-base leading-relaxed max-w-lg">
            ExoConnect gives dentists instant access to vetted dental CAD
            designers who specialize in Exocad and digital smile design — so
            you can deliver better dentistry without the bottleneck.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/projects/new">
                Find a Designer <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-white border-white/30 hover:bg-white/10"
              asChild
            >
              <Link href="/auth/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="px-6 lg:px-16 py-20 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              ✦ The Problem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Two bad options.
              <br />
              Neither works.
            </h2>
          </div>
          <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed lg:pt-10">
            <p>
              Most practices either hire an in-house designer — a fixed cost
              that doesn&apos;t scale — or spend hours vetting freelancers with
              no guarantee of quality or turnaround. Neither option is
              sustainable.
            </p>
            <p>
              We&apos;ve built a curated network of professional dental CAD
              designers who work specifically in Exocad and digital smile
              workflows. You post a case, we connect you with the right
              designer, and you get back a design that&apos;s ready to mill.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits — numbered list */}
      <section className="bg-[#F8F6F1] py-20 lg:py-28 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              ✦ Why Dentists Choose ExoConnect
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Six reasons practices
              <br />
              trust ExoConnect.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
            {BENEFITS.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="bg-white p-8 flex gap-5 hover:bg-[#fafafa] transition-colors"
              >
                <div className="shrink-0 flex flex-col items-center gap-3 pt-0.5">
                  <span className="text-[11px] font-bold text-primary/60 tracking-widest tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="size-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works narrative */}
      <section className="px-6 lg:px-16 py-20 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              ✦ How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Seamless from scan
              <br />
              to restoration.
            </h2>
            <div className="mt-8 space-y-6">
              {[
                { step: "01", label: "Post your case", desc: "Share scan files, case notes, and requirements directly on the platform." },
                { step: "02", label: "Get matched", desc: "We connect you with a vetted designer who specializes in your case type." },
                { step: "03", label: "Review & mill", desc: "Receive a manufacture-ready design, approve it, and send to your mill." },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex gap-4">
                  <span className="text-[11px] font-bold text-primary tracking-widest tabular-nums pt-0.5 shrink-0">
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{label}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="bg-[#0d0d1a] rounded-2xl p-8 text-white">
              <Quote className="size-7 text-[#4ecdc4] mb-5" />
              <blockquote className="text-lg sm:text-xl font-medium leading-snug">
                ExoConnect connects dentists with expert CAD designers on
                demand, reducing design bottlenecks, accelerating case delivery,
                and helping practices achieve more predictable restorative
                outcomes.
              </blockquote>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-white/40 text-sm">ExoConnect</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { stat: "48h", label: "Avg. turnaround" },
                { stat: "100%", label: "Vetted designers" },
                { stat: "0", label: "Long-term contracts" },
              ].map(({ stat, label }) => (
                <div
                  key={label}
                  className="border border-gray-100 rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-gray-900">{stat}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url('/img/cta.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 px-6 lg:px-16 bg-gradient-to-r from-black/85 to-black/10 py-24 lg:py-32">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
              Ready to Deliver
              <br />
              Better Dentistry?
            </h2>
            <p className="text-white/50 mt-4 text-[13.5px] leading-relaxed">
              Join practices already using ExoConnect to work smarter, reduce
              remakes, and grow their digital capabilities without the overhead.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button className="rounded-full" asChild>
                <Link href="/projects/new">
                  Find a Designer <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-white border-white/30 hover:bg-white/10"
                asChild
              >
                <Link href="/auth/register">Create Free Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
