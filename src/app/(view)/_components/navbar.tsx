"use client";

import { Outfit } from "next/font/google";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const NAV_LINKS = [
  { label: "How it works?", href: "/how-it-works" },
  { label: "Features", href: "#features" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`);
          return;
        }
      }
      setActive("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <header
        className={cn(
          "fixed top-8 rounded-xl left-8 right-8 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-background shadow",
        )}
      >
        <div className="w-full mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <span
                className={cn(
                  "text-2xl font-bold text-white transition-opacity group-hover:opacity-80",
                  outfit.className,
                )}
              >
                exo connect
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-9">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    // onClick={(e) => scroll(e, link.href)}
                    className={cn(
                      "relative text-sm font-medium transition-colors after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 hover:after:scale-x-100",
                      active === link.href
                        ? "text-white after:scale-x-100"
                        : "text-[#a0a0b8] hover:text-white",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-[#a0a0b8] hover:text-white"
                  >
                    I’m a dentist <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/as/dentist">I’m a Dentist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/as/designer">I’m a Designer</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/as/lab">I’m a Dental Lab</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/auth/login"
                className="text-[#a0a0b8] hover:text-white text-sm font-medium px-4 py-2 transition-colors rounded-lg hover:bg-white/[0.06]"
              >
                Login
              </Link>
              <Button
                className="h-10 bg-white hover:bg-white/80 text-black"
                asChild
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={cn(
                  "absolute transition-all duration-200",
                  open ? "opacity-100 rotate-0" : "opacity-0 rotate-90",
                )}
              >
                <X size={20} />
              </span>
              <span
                className={cn(
                  "absolute transition-all duration-200",
                  open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0",
                )}
              >
                <Menu size={20} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            open ? " opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="border-t border-white/[0.07] px-6 pt-4 pb-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scroll(e, link.href)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  active === link.href
                    ? "text-white bg-white/[0.08]"
                    : "text-[#a0a0b8] hover:text-white hover:bg-white/[0.05]",
                )}
              >
                {active === link.href && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                )}
                {link.label}
              </a>
            ))}

            <Link
              href="/as/dentist"
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active === "/as/dentist"
                  ? "text-white bg-white/[0.08]"
                  : "text-[#a0a0b8] hover:text-white hover:bg-white/[0.05]",
              )}
            >
              I’m a Dentist
            </Link>

            <Link
              href="/as/designer"
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active === "/as/designer"
                  ? "text-white bg-white/[0.08]"
                  : "text-[#a0a0b8] hover:text-white hover:bg-white/[0.05]",
              )}
            >
              I’m a Designer
            </Link>

            <Link
              href="/as/lab"
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active === "/as/lab"
                  ? "text-white bg-white/[0.08]"
                  : "text-[#a0a0b8] hover:text-white hover:bg-white/[0.05]",
              )}
            >
              I’m a Dental Lab
            </Link>

            <div className="border-t border-white/[0.07] mt-3 pt-4 flex flex-col gap-2">
              <a
                href="#login"
                className="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium text-[#a0a0b8] hover:text-white hover:bg-white/[0.05] transition-all duration-150"
              >
                Login
              </a>
              <Button
                className="bg-white hover:bg-white/80 h-10 w-full text-black"
                asChild
              >
                <Link href="#pricing" onClick={(e) => scroll(e, "#pricing")}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
