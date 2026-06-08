import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Globe,
  Quote,
  Repeat2,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const BENEFITS = [
  {
    icon: Globe,
    title: "Access Qualified Dentists Worldwide",
    body: "Connect with practices actively seeking crowns, veneers, implants, full-arch, and smile design services — no cold outreach required.",
  },
  {
    icon: Repeat2,
    title: "Build Recurring Client Relationships",
    body: "Turn one-time cases into long-term partnerships. Happy dentists come back, and your revenue becomes predictable.",
  },
  {
    icon: TrendingUp,
    title: "Increase Your Case Volume",
    body: "Keep your design pipeline full without spending hours on marketing and sales. ExoConnect brings the work to you.",
  },
  {
    icon: BadgeCheck,
    title: "Showcase Your Expertise",
    body: "Build a professional profile that highlights your portfolio, specialties, turnaround times, and experience. Let your work speak for itself.",
  },
  {
    icon: Briefcase,
    title: "Work On Your Own Terms",
    body: "Accept the cases that fit your skills, schedule, and pricing. You set the pace — no agency dictating your workload.",
  },
  {
    icon: Star,
    title: "Grow Your Reputation",
    body: "Collect verified reviews and establish credibility within the digital dentistry community. Build the kind of track record that compounds.",
  },
];

export default function DesignerPage() {
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
            ✦ For CAD Designers
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight">
            Turn Your CAD Skills Into
            <br />
            a Thriving Design Business.
          </h1>
          <p className="mt-5 text-white/60 text-[15px] sm:text-base leading-relaxed max-w-lg">
            ExoConnect gives dental CAD designers direct access to dentists
            actively looking for design support — eliminating cold outreach so
            you can focus on creating exceptional restorations.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/auth/register?role=designer">
                Join as a Designer <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-white border-white/30 hover:bg-white/10"
              asChild
            >
              <Link href="/projects">Browse Open Cases</Link>
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
              Great designers
              <br />
              shouldn&apos;t chase clients.
            </h2>
          </div>
          <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed lg:pt-10">
            <p>
              Most talented designers spend more time prospecting than
              designing. You finish a crown case and immediately start worrying
              about where the next one comes from. That cycle drains energy
              that should go into your work.
            </p>
            <p>
              ExoConnect builds you a pipeline that doesn&apos;t require you to
              be a marketer. Your profile does the selling. Your work does the
              talking.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits — numbered grid */}
      <section className="bg-[#F8F6F1] py-20 lg:py-28 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              ✦ Why CAD Designers Choose ExoConnect
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Stop prospecting.
              <br />
              Start designing.
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

      {/* Bigger picture narrative */}
      <section className="px-6 lg:px-16 py-20 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              ✦ The Bigger Picture
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Built for designers
              <br />
              who want to grow.
            </h2>
            <div className="mt-8 space-y-4 text-gray-600 text-[15px] leading-relaxed">
              <p>
                Whether you&apos;re building a full-time design business or
                taking on cases alongside lab work, ExoConnect gives you a
                consistent flow of qualified clients — without the overhead of
                running your own outreach.
              </p>
              <p>
                ExoConnect bridges the gap between talented CAD designers and
                dentists seeking reliable support. Your profile, portfolio, and
                reviews do the selling while you focus on delivering exceptional
                work.
              </p>
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="bg-[#0d0d1a] rounded-2xl p-8 text-white">
              <Quote className="size-7 text-[#4ecdc4] mb-5" />
              <blockquote className="text-lg sm:text-xl font-medium leading-snug">
                ExoConnect helps dental CAD designers connect directly with
                dentists, grow recurring client relationships, and increase case
                volume without the burden of marketing or sales.
              </blockquote>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-white/40 text-sm">ExoConnect</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { stat: "$0", label: "Marketing spend needed" },
                { stat: "100%", label: "Your own pricing" },
                { stat: "∞", label: "Case types accepted" },
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
              Ready to Fill Your
              <br />
              Design Pipeline?
            </h2>
            <p className="text-white/50 mt-4 text-[13.5px] leading-relaxed">
              Join designers already using ExoConnect to build consistent
              caseloads, grow client relationships, and run a sustainable
              independent practice.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button className="rounded-full" asChild>
                <Link href="/auth/register?role=designer">
                  Join as a Designer <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-white border-white/30 hover:bg-white/10"
                asChild
              >
                <Link href="/projects">Browse Open Cases</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
