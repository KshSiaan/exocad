"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TESTIMONIALS = [
  {
    stars: 5,
    text: "Finding reliable exocad designers used to take days. With ExoConnect, we connected with experienced professionals within hours and significantly improved our turnaround time.",
    name: "Jenny Wilson",
    role: "Dentist",
  },
  {
    stars: 5,
    text: "ExoConnect transformed how our lab collaborates with designers. The platform is intuitive and the matching algorithm is impressively accurate.",
    name: "Marcus Chen",
    role: "Lab Director",
  },
  {
    stars: 5,
    text: "As an exocad designer, this platform gave me consistent work and a professional way to showcase my portfolio. My income doubled within 3 months.",
    name: "Sarah Park",
    role: "CAD Designer",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(1);

  return (
    <section className="bg-white py-20 lg:py-28">
      {/* Constrained top section */}
      <div className=" px-6 lg:px-10 mb-14">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: heading */}
          <div>
            <h2 className="text-[2.6rem] sm:text-5xl lg:text-[3.2rem] font-black text-gray-900 leading-[1.08] tracking-tight">
              Trusted By Dental
              <br />
              Practices &amp; Exocad
              <br />
              Designers Worldwide
            </h2>
          </div>

          {/* Right: description + arrows */}
          <div className="flex flex-col justify-between h-full gap-6">
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-md">
              See how ExoConnect is helping dental professionals collaborate
              faster, deliver better results, and grow their workflow with
              confidence.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setIndex(
                    (p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                  )
                }
                className="w-12 h-12 rounded-full bg-[#0d0d1a] flex items-center justify-center hover:bg-[#1a1a2e] transition-colors"
              >
                <ArrowLeft size={18} className="text-white" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((p) => (p + 1) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors bg-white"
              >
                <ArrowRight size={18} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait cards — full viewport width, overflow hidden on section */}
      <div className="overflow-hidden">
        <div className="flex gap-4 px-6 lg:px-10">
          {TESTIMONIALS.map((item, i) => {
            const isActive = i === index;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer max-h-[50dvh]",
                  isActive
                    ? "flex-1 min-w-0 opacity-100"
                    : "w-[20dvw] opacity-40 hover:opacity-60",
                )}
                style={{ aspectRatio: "3/4" }}
              >
                {/* portrait image */}
                <Image
                  src="https://placehold.co/400"
                  alt={`Portrait of ${item.name}`}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* active: review card overlay at bottom */}
                {isActive && (
                  <div className="absolute inset-x-4 bottom-4 bg-white rounded-xl p-5 shadow-sm">
                    {/* stars */}
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: item.stars }, (_, si) => (
                        <svg
                          key={`star-${item.name}-${si}`}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="fill-amber-400"
                          aria-hidden="true"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-[13px] leading-relaxed mb-4 w-full text-start!">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="https://placehold.co/400"
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-[13px]">
                          {item.name}
                        </p>
                        <p className="text-gray-400 text-xs">{item.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* inactive: name at bottom */}
                {!isActive && (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 50%)",
                      }}
                    />
                    <div className="absolute bottom-4 left-4 text-left">
                      <p className="text-white font-semibold text-[12px]">
                        {item.name}
                      </p>
                      <p className="text-white/60 text-[11px]">{item.role}</p>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
