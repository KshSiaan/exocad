"use client";

import {
  ArrowLeft,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DESIGNER = {
  id: 1,
  name: "Sarah Mitchell",
  title: "Senior Dental CAD Designer",
  location: "New York, USA",
  timezone: "EST (UTC-5)",
  rating: 4.9,
  reviews: 127,
  projects: 450,
  responseTime: "< 2 hours",
  memberSince: "March 2021",
  completionRate: 98,
  onTime: 96,
  status: "Available" as const,
  bio: "I specialize in high-precision Crown & Bridge, implant-supported restorations, and full-arch cases. With 8+ years in dental CAD design using exocad and 3Shape, I deliver anatomically accurate STL files optimized for milling and 3D printing. Every case is handled with meticulous attention to occlusion, contacts, and emergence profiles.",
  specializations: [
    "Crown & Bridge",
    "Implants",
    "Full Arch",
    "Veneers",
    "Implant Bars",
  ],
  software: ["exocad", "3Shape", "Meshmixer"],
  priceMin: 85,
  priceMax: 120,
  turnaround: "24–48 hrs",
  portfolio: [
    {
      id: 1,
      title: "Full Arch Implant Bar",
      type: "Implant Bar",
      label: "STL",
    },
    { id: 2, title: "PFM Crown Set ×4", type: "Crown & Bridge", label: "STL" },
    { id: 3, title: "All-on-4 Framework", type: "Full Arch", label: "STL" },
    { id: 4, title: "Anterior Veneers ×6", type: "Veneers", label: "STL" },
    { id: 5, title: "Implant Abutment ×2", type: "Implants", label: "STL" },
    {
      id: 6,
      title: "Removable Partial Denture",
      type: "Full Arch",
      label: "STL",
    },
  ],
  reviews_list: [
    {
      name: "Dr. Kevin Walsh",
      practice: "Walsh Dental Group",
      rating: 5,
      date: "May 28, 2024",
      text: "Sarah delivered an exceptional full-arch case. Perfect contacts, beautiful occlusion, and zero adjustments needed. Will definitely use again.",
    },
    {
      name: "Dr. Priya Sharma",
      practice: "Smile Studio",
      rating: 5,
      date: "May 14, 2024",
      text: "Incredibly fast turnaround on a complex implant bar. Communication was excellent throughout the process.",
    },
    {
      name: "Dr. Robert Chen",
      practice: "Premier Orthodontics",
      rating: 4,
      date: "Apr 30, 2024",
      text: "High quality work. Minor tweak needed on one contact but it was handled immediately. Would recommend.",
    },
  ],
};

const STATUS_STYLE = {
  Available: "bg-green-500/15 text-green-500 border-green-500/30",
  Busy: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  "Not Available": "bg-red-500/15 text-red-500 border-red-500/30",
};

export default function DesignerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  use(params);
  const d = DESIGNER;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/designers"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Designers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  <div className="size-20 shrink-0 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    SM
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h1 className="text-xl font-bold text-foreground">
                          {d.name}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          {d.title}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" />
                          {d.location} · {d.timezone}
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLE[d.status]}`}
                      >
                        {d.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{d.rating}</span>
                        <span className="text-muted-foreground">
                          ({d.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CheckCircle className="size-4 text-emerald-500" />
                        <span>{d.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="size-4" />
                        <span>Responds {d.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {d.bio}
                </p>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {d.portfolio.map((p) => (
                    <div
                      key={p.id}
                      className="aspect-square rounded-xl bg-muted/40 border border-border/50 flex flex-col items-center justify-center gap-2 text-center p-3 hover:bg-muted/60 transition-colors cursor-pointer"
                    >
                      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {p.label}
                      </div>
                      <p className="text-xs font-medium text-foreground leading-tight">
                        {p.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {p.type}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Reviews</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-sm">{d.rating}</span>
                    <span className="text-xs text-muted-foreground">/ 5.0</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {d.reviews_list.map((r, i) => (
                  <div key={r.name}>
                    {i > 0 && <Separator className="mb-4" />}
                    <div className="flex items-start gap-3">
                      <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {r.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {r.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {r.practice}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {Array.from({ length: r.rating }, (_, j) => (
                              <Star
                                key={`star-${r.name}-${j}`}
                                className="size-3 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {r.text}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {r.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Booking card */}
            <Card className="border-border/50 sticky top-6">
              <CardContent className="p-5 space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">
                    ${d.priceMin}–${d.priceMax}
                  </p>
                  <p className="text-xs text-muted-foreground">per case</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Turnaround</span>
                    <span className="font-medium">{d.turnaround}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response time</span>
                    <span className="font-medium">{d.responseTime}</span>
                  </div>
                </div>
                <Separator />
                <Button className="w-full gap-2" asChild>
                  <Link href="/projects/new">
                    <CheckCircle className="size-4" />
                    Request This Designer
                  </Link>
                </Button>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <Link href="/messages">
                    <MessageSquare className="size-4" />
                    Send Message
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    label: "Completion Rate",
                    value: `${d.completionRate}%`,
                    icon: CheckCircle,
                    color: "text-emerald-500",
                  },
                  {
                    label: "On-Time Delivery",
                    value: `${d.onTime}%`,
                    icon: Clock,
                    color: "text-blue-500",
                  },
                  {
                    label: "Repeat Clients",
                    value: "67%",
                    icon: ThumbsUp,
                    color: "text-primary",
                  },
                  {
                    label: "Member Since",
                    value: d.memberSince,
                    icon: Award,
                    color: "text-amber-500",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <s.icon className={`size-4 ${s.color}`} />
                      {s.label}
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {s.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {d.specializations.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Software */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Software</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {d.software.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium border border-border bg-muted/40 px-2.5 py-1 rounded-lg text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
