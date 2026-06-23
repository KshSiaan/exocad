"use client";

import { Building2, Eye, EyeOff, Lock, Mail, MapPin, User } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

type Role = "dentist" | "designer";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>(
    searchParams.get("role") === "designer" ? "designer" : "dentist",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundImage: "url('/img/auth.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0a0a14]/70" />
        <Link href="/" className="relative z-10">
          <span
            className={cn("text-2xl font-bold text-white", outfit.className)}
          >
            exo connect
          </span>
        </Link>
        <div className="relative z-10 space-y-5">
          <p className="text-4xl font-bold text-white leading-tight">
            {role === "dentist"
              ? "Get professional STL designs for your practice."
              : "Grow your dental CAD career."}
          </p>
          <ul className="space-y-3">
            {(role === "dentist"
              ? [
                  "Access 1,200+ verified designers",
                  "Turnaround in 24–72 hours",
                  "Secure file transfer & messaging",
                  "Pay only when satisfied",
                ]
              : [
                  "Set your own rates & availability",
                  "Get matched with dental practices",
                  "Platform handles payments & invoicing",
                  "Build your portfolio & reputation",
                ]
            ).map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#a0a0b8]">
                <span className="size-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-xs text-[#a0a0b8]">
          © 2024 ExoConnect. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-7">
          <div className="space-y-2">
            <Link href="/" className="lg:hidden block mb-6">
              <span
                className={cn(
                  "text-xl font-bold text-foreground",
                  outfit.className,
                )}
              >
                exo connect
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              Create account
            </h1>
            <p className="text-muted-foreground text-sm">
              Join ExoConnect today
            </p>
          </div>

          {/* Role toggle */}
          <div className="flex rounded-xl border border-border bg-muted p-1">
            {(["dentist", "designer"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                  role === r
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r === "dentist" ? "Dental Practice" : "CAD Designer"}
              </button>
            ))}
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {([1, 2] as const).map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 rounded-full transition-all flex-1",
                  step >= s ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input placeholder="John" className="pl-10 h-11" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Last Name</Label>
                    <Input placeholder="Doe" className="h-11" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      className="pl-10 pr-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button className="w-full h-11" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </>
            ) : (
              <>
                {role === "dentist" ? (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Practice Name
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Bright Smiles Dental"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="City, State"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Practice Type
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "General Dentistry",
                            "Orthodontics",
                            "Prosthodontics",
                            "Periodontics",
                            "Oral Surgery",
                            "Pediatric Dentistry",
                          ].map((t) => (
                            <SelectItem
                              key={t}
                              value={t.toLowerCase().replace(/\s/g, "-")}
                            >
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Primary Specialization
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Crown & Bridge",
                            "Implants",
                            "Full Arch",
                            "Veneers",
                            "Orthodontics",
                            "Dentures",
                          ].map((s) => (
                            <SelectItem
                              key={s}
                              value={s.toLowerCase().replace(/\s|&/g, "-")}
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">
                        Years of Experience
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Less than 1 year",
                            "1–3 years",
                            "3–5 years",
                            "5–10 years",
                            "10+ years",
                          ].map((e) => (
                            <SelectItem key={e} value={e}>
                              {e}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="City, Country"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-11"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button className="flex-1 h-11" asChild>
                    <Link href={`/subscription?role=${role}`}>
                      Create Account
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
