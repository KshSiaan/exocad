import { BoxIcon, HeartPulse, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PILLS = [
  {
    icon: HeartPulse,
    title: "Personalized Care",
    desc: "Tailored treatment plans...",
  },
  {
    icon: BoxIcon,
    title: "Expert-Led Wellness",
    desc: "Access evidence providers for you",
  },
  {
    icon: Lightbulb,
    title: "Expert-Led Design",
    desc: "Supporting smarter wellbeing",
  },
];

export function Hero() {
  return (
    <section
      className="relative min-h-dvh bg-[#0d0d1a] bg-cover bg-right overflow-hidden "
      style={{
        backgroundImage: `url('/img/header.webp')`,
      }}
    >
      <div className="w-full px-6 lg:px-10 relative z-10 backdrop-brightness-50">
        <div className="gap-10 items-center min-h-dvh py-16 pt-48">
          {/* Left */}
          <div className="space-y-7">
            <h1 className="text-[2.6rem] sm:text-5xl lg:text-7xl  text-white leading-[1.1] tracking-tight">
              Connect Dentist
              <br />
              And Dental Labs
              <br />
              With CAD Designers
            </h1>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full" asChild>
                <Link href="/projects/new">Find a Designer</Link>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/auth/register?role=designer">Join as a Designer</Link>
              </Button>
            </div>

            {/* <div className="flex absolute bottom-0 left-0 sm:px-6 py-6 sm:py-6 flex-col sm:flex-row gap-5 pt-2 sm:divide-x divide-foreground/50">
              {PILLS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="gap-3 flex-1 px-6">
                  <Icon size={15} className="text-foreground size-6" />
                  <div>
                    <p className="text-white/90 font-semibold text-nowrap">
                      {title}
                    </p>
                    <p className="text-white/40 text-[11px] mt-0.5 leading-snug">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
