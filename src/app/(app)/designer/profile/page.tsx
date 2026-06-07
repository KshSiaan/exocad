"use client";

import {
  Camera,
  Eye,
  Globe,
  Lock,
  MapPin,
  Plus,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "profile", label: "Public Profile", icon: Globe },
  { id: "availability", label: "Availability", icon: Star },
  { id: "security", label: "Security", icon: Lock },
];

const SPECS = [
  "Crown & Bridge",
  "Implants",
  "Full Arch",
  "Veneers",
  "Implant Bars",
  "Orthodontics",
  "Dentures",
];

export default function DesignerProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [specs, setSpecs] = useState([
    "Crown & Bridge",
    "Implants",
    "Full Arch",
    "Veneers",
  ]);
  const [availability, setAvailability] = useState<
    "Available" | "Busy" | "Not Available"
  >("Available");

  const toggleSpec = (s: string) => {
    setSpecs((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your public profile and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="bg-white border-border/60 shadow-sm lg:col-span-1 h-fit">
          <CardContent className="p-3">
            <div className="flex flex-col items-center gap-3 py-4 px-2">
              <div className="relative">
                <div className="size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  SC
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 size-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center"
                >
                  <Camera size={11} />
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  Sarah Chen
                </p>
                <div className="flex items-center gap-1 justify-center mt-0.5">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">
                    4.9 · 127 reviews
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            <nav className="space-y-0.5">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeSection === s.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  <s.icon size={15} />
                  {s.label}
                </button>
              ))}
            </nav>
            <Separator className="my-2" />
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs h-8 gap-1.5"
              asChild
            >
              <a href="/designers/1" target="_blank" rel="noopener noreferrer">
                <Eye size={12} />
                Preview Profile
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === "profile" && (
            <div className="space-y-5">
              <Card className="bg-white border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>First Name</Label>
                      <Input defaultValue="Sarah" className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Last Name</Label>
                      <Input defaultValue="Chen" className="h-10" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Professional Title</Label>
                    <Input
                      defaultValue="Senior Dental CAD Designer"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        defaultValue="New York, USA"
                        className="pl-10 h-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Bio</Label>
                    <Textarea
                      defaultValue="I specialize in high-precision Crown & Bridge, implant-supported restorations, and full-arch cases. With 8+ years in dental CAD design using exocad and 3Shape, I deliver anatomically accurate STL files optimized for milling and 3D printing."
                      className="resize-none min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {SPECS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSpec(s)}
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all",
                          specs.includes(s)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary/40",
                        )}
                      >
                        {specs.includes(s) ? (
                          <X size={10} />
                        ) : (
                          <Plus size={10} />
                        )}
                        {s}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Min Rate (per case)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        $
                      </span>
                      <Input defaultValue="85" className="pl-7 h-10" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Max Rate (per case)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        $
                      </span>
                      <Input defaultValue="120" className="pl-7 h-10" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button>Save Profile</Button>
              </div>
            </div>
          )}

          {activeSection === "availability" && (
            <Card className="bg-white border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Current Status</Label>
                  <div className="flex gap-2">
                    {(["Available", "Busy", "Not Available"] as const).map(
                      (s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setAvailability(s)}
                          className={cn(
                            "flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all",
                            availability === s
                              ? s === "Available"
                                ? "bg-emerald-500 text-white border-emerald-500"
                                : s === "Busy"
                                  ? "bg-amber-500 text-white border-amber-500"
                                  : "bg-red-500 text-white border-red-500"
                              : "border-border text-muted-foreground hover:bg-muted/40",
                          )}
                        >
                          {s}
                        </button>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Update Availability</Button>
                </div>
              </CardContent>
            </Card>
          )}


          {activeSection === "security" && (
            <Card className="bg-white border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    placeholder="Min 8 characters"
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10"
                  />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
