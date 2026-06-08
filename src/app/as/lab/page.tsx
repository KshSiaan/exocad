import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers,
  Quote,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const BENEFITS = [
  {
    icon: BarChart3,
    title: "Increase Production Capacity On Demand",
    body: "Handle fluctuations in case volume without overstaffing. Scale up when cases spike, scale back when they don't.",
  },
  {
    icon: DollarSign,
    title: "Reduce Labor Costs",
    body: "Access skilled CAD designers only when you need them. Eliminate the overhead of full-time hires — benefits, training, idle time — all of it.",
  },
  {
    icon: Clock,
    title: "Accelerate Turnaround Times",
    body: "Keep cases moving through production by outsourcing design work during peak periods. No more bottlenecks at the design station.",
  },
  {
    icon: Layers,
    title: "Access Specialized Expertise",
    body: "Connect with designers experienced in crowns, veneers, implants, full-arch restorations, dentures, and complex digital workflows.",
  },
  {
    icon: TrendingUp,
    title: "Improve Scalability",
    body: "Grow your business without being limited by in-house design resources. Your capacity is now elastic, not fixed.",
  },
  {
    icon: Users,
    title: "Minimize Staffing Challenges",
    body: "Reduce reliance on recruiting, training, and retaining CAD personnel in a competitive labor market. The talent is already vetted.",
  },
  {
    icon: Shield,
    title: "Maintain Consistent Quality",
    body: "Work with vetted designers who understand laboratory workflows and manufacturing requirements — not just generic CAD operators.",
  },
  {
    icon: CheckCircle2,
    title: "Focus on Production & Client Service",
    body: "Let expert designers handle digital design while your team concentrates on fabrication and the client relationships that matter.",
  },
];

export default function LabPage() {
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
            ✦ For Dental Labs
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight">
            Scale Your Lab Without
            <br />
            Expanding Your Payroll.
          </h1>
          <p className="mt-5 text-white/60 text-[15px] sm:text-base leading-relaxed max-w-lg">
            ExoConnect gives dental laboratories instant access to experienced
            CAD designers — increase capacity, reduce bottlenecks, and meet
            demanding turnarounds without full-time hiring costs.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/projects/new">
                Post a Case <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-white border-white/30 hover:bg-white/10"
              asChild
            >
              <Link href="/auth/register">Create Free Account</Link>
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
              Case volume doesn&apos;t
              <br />
              arrive on schedule.
            </h2>
          </div>
          <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed lg:pt-10">
            <p>
              You get slammed in February, quiet in August, and your staffing
              plan is always guessing. Hire too early and you carry dead weight.
              Hire too late and cases pile up at the design station.
            </p>
            <p>
              ExoConnect makes your design capacity elastic. Access vetted CAD
              designers only when you need them — no recruitment, no onboarding,
              no overhead. Just output, on demand.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits — numbered grid */}
      <section className="bg-[#F8F6F1] py-20 lg:py-28 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              ✦ Why Dental Labs Choose ExoConnect
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Design capacity that moves
              <br />
              with your caseload.
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

      {/* Bigger picture */}
      <section className="px-6 lg:px-16 py-20 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              ✦ The Bigger Picture
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Design as a resource,
              <br />
              not a headache.
            </h2>
            <div className="mt-8 space-y-4 text-gray-600 text-[15px] leading-relaxed">
              <p>
                The design seat is the first thing to back up and the hardest
                position to fill. Finding someone who knows Exocad, understands
                your workflow, and hits turnaround times without handholding
                takes months — and when they leave, you start over.
              </p>
              <p>
                ExoConnect transforms design from a staffing challenge into a
                scalable resource. Whether you need one designer for a busy week
                or consistent support across multiple seats, the talent is
                already vetted and ready to work inside your process.
              </p>
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="bg-[#0d0d1a] rounded-2xl p-8 text-white">
              <Quote className="size-7 text-[#4ecdc4] mb-5" />
              <blockquote className="text-lg sm:text-xl font-medium leading-snug">
                ExoConnect enables dental labs to instantly scale design
                capacity, reduce staffing costs, and accelerate case turnaround
                through a network of expert CAD designers.
              </blockquote>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-white/40 text-sm">ExoConnect</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { stat: "8", label: "Reasons labs trust us" },
                { stat: "0", label: "Recruitment overhead" },
                { stat: "∞", label: "Scalable capacity" },
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
              Ready to Make Design
              <br />a Competitive Advantage?
            </h2>
            <p className="text-white/50 mt-4 text-[13.5px] leading-relaxed">
              Join labs already using ExoConnect to scale on demand, cut
              staffing overhead, and deliver faster turnarounds without adding
              headcount.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button className="rounded-full" asChild>
                <Link href="/projects/new">
                  Post a Case <ArrowRight className="ml-2 size-4" />
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
