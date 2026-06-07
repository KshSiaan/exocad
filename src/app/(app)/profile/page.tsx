"use client";

import {
  Building2,
  Camera,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
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
  { id: "personal", label: "Personal Info", icon: User },
  { id: "practice", label: "Practice", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Lock },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your profile and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="bg-white border-border/60 shadow-sm lg:col-span-1 h-fit">
          <CardContent className="p-3">
            {/* Avatar section */}
            <div className="flex flex-col items-center gap-3 py-4 px-2">
              <div className="relative">
                <div className="size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  BM
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 size-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Camera size={11} />
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  Dr. Brian Martinez
                </p>
                <p className="text-xs text-muted-foreground">
                  Bright Smiles Dental
                </p>
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
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === "personal" && (
            <Card className="bg-white border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>First Name</Label>
                    <Input defaultValue="Brian" className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last Name</Label>
                    <Input defaultValue="Martinez" className="h-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      defaultValue="brian.martinez@brightsmiles.com"
                      className="pl-10 h-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      defaultValue="+1 (555) 234-5678"
                      className="pl-10 h-10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Timezone</Label>
                  <Select defaultValue="eastern">
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Eastern (EST)",
                        "Central (CST)",
                        "Mountain (MST)",
                        "Pacific (PST)",
                      ].map((tz) => (
                        <SelectItem
                          key={tz}
                          value={tz.split(" ")[0].toLowerCase()}
                        >
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "practice" && (
            <Card className="bg-white border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Practice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <Label>Practice Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      defaultValue="Bright Smiles Dental"
                      className="pl-10 h-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input defaultValue="New York" className="pl-10 h-10" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>State</Label>
                    <Input defaultValue="NY" className="h-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Practice Type</Label>
                  <Select defaultValue="general">
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "General Dentistry",
                        "Orthodontics",
                        "Prosthodontics",
                        "Periodontics",
                        "Oral Surgery",
                      ].map((t) => (
                        <SelectItem
                          key={t}
                          value={t.toLowerCase().split(" ")[0]}
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>About / Notes for Designers</Label>
                  <Textarea
                    defaultValue="We're a general practice focused on aesthetic restorations and implant work. We use exocad and prefer contacts at 30–40 μm. CBCT scans provided for all implant cases."
                    className="resize-none min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "billing" && (
            <Card className="bg-white border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Billing & Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-xl border border-border/60 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Visa •••• 4242
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expires 08/2026
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                      Default
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-muted-foreground"
                    >
                      Replace
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <CreditCard size={14} />
                  Add New Payment Method
                </Button>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Recent Invoices
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        id: "INV-2847",
                        date: "Jun 7, 2024",
                        amount: "$145.00",
                        status: "Paid",
                      },
                      {
                        id: "INV-2833",
                        date: "Jun 1, 2024",
                        amount: "$195.00",
                        status: "Paid",
                      },
                      {
                        id: "INV-2810",
                        date: "May 28, 2024",
                        amount: "$88.00",
                        status: "Paid",
                      },
                    ].map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {inv.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {inv.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-foreground">
                            {inv.amount}
                          </span>
                          <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                            {inv.status}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-muted-foreground"
                          >
                            PDF
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <Card className="bg-white border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Min 8 characters"
                        className="pl-10 h-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-10"
                      />
                    </div>
                  </div>
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
