"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <p className="text-4xl font-bold text-white leading-tight">
              Connect with the best dental CAD designers.
            </p>
            <p className="text-[#a0a0b8] text-lg">
              Professional STL files. Fast turnaround. Guaranteed quality.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "1,200+", label: "Designers" },
              { value: "50K+", label: "Projects Done" },
              { value: "4.9★", label: "Avg Rating" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/5 border border-white/10 p-4"
              >
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-[#a0a0b8] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-xs text-[#a0a0b8]">
          © 2024 ExoConnect. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
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
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-11"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11"
                  autoComplete="current-password"
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

            <Button className="w-full h-11" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
          </form>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
