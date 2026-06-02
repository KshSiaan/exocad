import { Marquee } from "@/components/extra/marquee";
import Image from "next/image";

type Card = {
  title: string;
  img: string;
  badge?: true;
};

const CARDS: Card[] = [
  {
    title: "Fast Turnaround",
    img: "/img/slide1.webp",
  },
  {
    title: "Real-time Collaboration",
    img: "/img/slide2.webp",
  },
  {
    title: "HIPAA Compliant",
    badge: true,
    img: "/img/slide3.webp",
  },
  {
    title: "Transparent Pricing",
    img: "/img/slide4.webp",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[#F8F6F1] py-20 lg:py-28">
      <div className="">
        <div className="text-center mb-14">
          <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
            ✦ How Does It Work
          </p>
          <h2 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-semibold text-gray-900 leading-tight">
            Everything Your Dental
            <br />
            CAD Design Needs
          </h2>
          <p className="mt-4 mx-auto text-sm leading-relaxed font-semibold text-background/60">
            Everything Your Dental Design Workflow Needs To Move Faster, Stay
            Aligned, <br /> And Protect Sensitive Patient Data With Confidence.
          </p>
        </div>

        <Marquee pauseOnHover className="[--duration:20s] gap-3 lg:gap-4 ">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="relative rounded-xl  overflow-hidden cursor-pointer group"
            >
              <Image
                src={card.img}
                alt={card.title}
                width={600}
                height={600}
                className="w-full aspect-square object-cover max-h-[50dvh]"
              />

              {/* bottom label */}
              <div className="py-4 gap-2">
                <p className="text-background font-bold text-lg">
                  {card.title}
                </p>
                <p className="text-[#4ecdc4] text-xs mt-0.5 font-medium">
                  View Details
                </p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
