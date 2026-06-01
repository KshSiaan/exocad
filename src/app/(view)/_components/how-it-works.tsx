"use client";

import { useState } from "react";
import {
  FileText,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const STEPS = [
  {
    icon: FileText,
    image: "/img/hiw1.webp",
    title: "Submit Your Case",
    desc: "Upload your case details and requirements for CAD design.",
  },
  {
    icon: Users,
    image: "/img/hiw2.webp",
    title: "Get Matched & Collaborate",
    desc: "Our matching system connects you with qualified designers.",
  },
  {
    icon: CheckCircle,
    image: "/img/hiw3.webp",
    title: "Review & Receive Designs",
    desc: "Review completed designs and receive final deliverables.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(1);
  const ActiveIcon = STEPS[active].icon;

  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-28">
      <div className=" px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
            ✦ How Does It Work
          </p>
          <h2 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900">
            How ExoConnect Works
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-[13.5px] leading-relaxed">
            ExoConnect Simplifies Dental CAD Collaboration With Secure Tools,
            Intelligent Matching, And Seamless Communication
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 items-start">
          {/* Steps panel */}
          <div className="bg-background rounded-2xl p-7 flex flex-col">
            <p className="text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
              3 SIMPLE STEPS
            </p>
            <div className="flex flex-col gap-1 flex-1">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === active;
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all w-full",
                      isActive
                        ? "bg-white/[0.08]"
                        : "opacity-40 hover:opacity-60 hover:bg-white/[0.03]",
                    )}
                  >
                    <Icon
                      size={17}
                      className={isActive ? "text-white" : "text-white/40"}
                    />
                    <span
                      className={cn(
                        "font-medium text-[13.5px]",
                        isActive ? "text-white" : "text-white/40",
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview panel */}
          <div className="relative rounded-2xl overflow-hidden aspect-video lg:min-h-0 flex flex-col">
            <Image
              src={STEPS[active].image}
              alt={STEPS[active].title}
              fill
              className="object-cover"
            />
            {/* Bottom info card */}
            <div className="absolute bottom-4 left-4 right-16 md:right-4 w-fit">
              <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 pr-12">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <ActiveIcon size={15} className="text-background size-6" />
                </div>
                <div>
                  <p className="text-background font-semibold text-[13px] text-nowrap">
                    {STEPS[active].title}
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-0.5 leading-snug text-nowrap">
                    {STEPS[active].desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => setActive((p) => Math.max(0, p - 1))}
                className="w-8 h-8 rounded-full bg-white/[0.12] hover:bg-white/[0.2] flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={15} className="text-white" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActive((p) => Math.min(STEPS.length - 1, p + 1))
                }
                className="w-8 h-8 rounded-full bg-white/[0.12] hover:bg-white/[0.2] flex items-center justify-center transition-colors"
              >
                <ChevronRight size={15} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
