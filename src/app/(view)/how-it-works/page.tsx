import {
  CreditCard,
  FileUp,
  MessageSquare,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Footer } from "../_components/footer";
import { HowItWorks } from "../_components/how-it-works";
import { Navbar } from "../_components/navbar";

const PLATFORM_FEATURES = [
  {
    icon: Search,
    title: "Find the Right Designer",
    body: "Browse vetted dental CAD designers by specialty, turnaround time, and portfolio. No cold calls, no guesswork — just qualified talent ready to take your case.",
    accent: "#4ecdc4",
  },
  {
    icon: FileUp,
    title: "Upload & Share Files Securely",
    body: "Share scan files, STL files, and case notes directly through the platform. Everything stays in one place — no email chains, no Dropbox folders.",
    accent: "#a78bfa",
  },
  {
    icon: Users,
    title: "Collaborate in One Place",
    body: "Work with your designer through a shared case workspace. Review progress, leave feedback, and track revisions without losing context.",
    accent: "#fb923c",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    body: "Communicate directly with your designer through built-in messaging. Ask questions, clarify requirements, and stay aligned throughout the case.",
    accent: "#34d399",
  },
  {
    icon: CreditCard,
    title: "Integrated Payments",
    body: "Pay securely through the platform once you're satisfied with the work. No invoices chased, no awkward payment conversations — just a clean, trusted transaction.",
    accent: "#60a5fa",
  },
  {
    icon: ShieldCheck,
    title: "Built on Trust",
    body: "Every designer is vetted before joining the platform. Reviews, ratings, and case history give you full visibility into who you're working with.",
    accent: "#f472b6",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Dark hero */}
        <section
          className="bg-[#0d0d1a] pt-48 pb-28 px-6 lg:px-16 relative overflow-hidden"
          style={{
            backgroundImage: `url('/img/header.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0d0d1a]/80" />
          <div className="relative z-10 max-w-3xl">
            <p className="text-[#4ecdc4] text-xs font-semibold tracking-[0.15em] uppercase mb-5">
              ✦ Who We Are
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
              A Marketplace Built for
              <br />
              Dental CAD Collaboration.
            </h1>
            <p className="mt-6 text-white/55 text-base sm:text-lg leading-relaxed max-w-xl">
              ExoConnect is a fully functional marketplace that facilitates
              relationships between those needing dental CAD services and the
              expert designers who provide them — removing the single biggest
              hurdle in digital dentistry.
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/projects/new">Post a Case</Link>
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

        {/* About strip */}
        <section className="border-b border-gray-100 px-6 lg:px-16 py-16 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                One workflow.
                <br />
                No friction.
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
              <p>
                For dentists and labs, ExoConnect means instant access to vetted
                designers — no more cold searches, no more unreliable
                freelancers. For designers, it means a steady stream of
                qualified clients without the overhead of marketing and sales.
              </p>
              <p>
                Share files directly with chosen designers, collaborate on cases
                in one place, communicate through built-in messaging, and pay
                securely — all without leaving the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Platform features — alternating rows */}
        <section className="py-20 lg:py-28">
          <div className="px-6 lg:px-16 mb-16 max-w-5xl mx-auto">
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              ✦ The Platform
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Everything in One Place.
              <br />
              Nothing Left Out.
            </h2>
          </div>

          <div className="space-y-0">
            {PLATFORM_FEATURES.map(({ icon: Icon, title, body, accent }, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={title}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch border-t border-gray-100`}
                >
                  {/* Color block */}
                  <div
                    className="w-full lg:w-[42%] min-h-[220px] lg:min-h-[280px] flex items-center justify-center"
                    style={{ backgroundColor: `${accent}18` }}
                  >
                    <div
                      className="size-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${accent}28` }}
                    >
                      <Icon className="size-9" style={{ color: accent }} />
                    </div>
                  </div>

                  {/* Text block */}
                  <div className="flex-1 px-8 lg:px-16 py-12 flex flex-col justify-center">
                    <p
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-3"
                      style={{ color: accent }}
                    >
                      0{i + 1}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed max-w-md">
                      {body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works interactive component */}
        <div className="border-t border-gray-100">
          <HowItWorks />
        </div>

        {/* CTA */}
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: `url('/img/cta.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 px-6 lg:px-16 bg-gradient-to-r from-black/80 to-black/10 py-20 lg:py-28">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
                Ready to Simplify
                <br />
                Your CAD Workflow?
              </h2>
              <p className="text-white/50 mt-4 text-[13.5px] leading-relaxed">
                Join dentists, labs, and designers already using ExoConnect to
                collaborate faster, deliver better work, and build lasting
                professional relationships.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button className="rounded-full" asChild>
                  <Link href="/projects/new">Post a Case</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <Link href="/auth/register?role=designer">
                    Join as a Designer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
