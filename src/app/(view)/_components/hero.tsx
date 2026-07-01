import { BoxIcon, HeartPulse, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";

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
    <section className="relative h-dvh bg-background overflow-hidden">
      {/* <div className="w-full px-6 lg:px-10 relative z-10 order-2 lg:order-1">
        <div className="gap-10 items-center min-h-dvh lg:py-16 lg:pt-48">
          <div className="space-y-7">
            <h1 className="text-[2.6rem] sm:text-5xl lg:text-7xl  text-white leading-[1.1] tracking-tight">
              Connecting Dentist
              <br />
              And Dental Labs
              <br />
              With CAD Designers
            </h1>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full" asChild>
                <Link href="/auth/register?role=dentist">
                  Join as a Dentist
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/auth/register?role=designer">
                  Join as a Designer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center relative order-1 lg:order-2 mt-24 lg:mt-12">
        <Image
          src="/img/bwink_med_02_single_04-ezgif.com-jpg-to-webp-converter.webp"
          className="object-contain object-center w-full h-full invert mix-blend-screen"
          fill
          alt="Hero Image"
        />
      </div> */}
      <Suspense fallback={<div className="w-full h-full bg-background" />}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/header.webm" type="video/webm" />
          <source src="/header.mp4" type="video/mp4" />
        </video>
      </Suspense>
    </section>
  );
}
