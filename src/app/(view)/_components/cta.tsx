import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section
      className="relative  overflow-hidden"
      style={{
        backgroundImage: `url('/img/cta.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 px-6 lg:px-10 bg-linear-to-r from-black/80 to-black/5 h-full py-20 lg:py-28">
        <div className="max-w-xl">
          <h2 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
            Ready To Transform Your
            <br />
            Dental CAD Workflow?
          </h2>
          <p className="text-white/50 mt-4 text-[13.5px] leading-relaxed">
            See how ExoConnect is helping dental professionals collaborate
            faster, deliver better results, and grow their workflow with
            confidence.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button className="rounded-full" asChild>
              <Link href="/projects/new">Find a Designer</Link>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/auth/register?role=designer">Join as a Designer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
