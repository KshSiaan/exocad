"use client";

import { Check, MoreHorizontal, Plus, Rocket, Star, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PLANS = [
  {
    key: "launch",
    name: "Launch",
    icon: Rocket,
    price: 49,
    interval: "month",
    description: "Perfect for new designers starting their CAD journey.",
    color: "text-muted-foreground",
    borderColor: "border-border",
    active: true,
    subscribers: 124,
    features: [
      "Up to 20 cases/month",
      "Basic STL viewer link",
      "Email support",
      "Standard turnaround (72h)",
      "1 revision per project",
    ],
  },
  {
    key: "grow",
    name: "Grow",
    icon: Zap,
    price: 99,
    interval: "month",
    description: "For growing designers handling a steady case volume.",
    color: "text-blue-500",
    borderColor: "border-blue-500/40",
    highlighted: true,
    active: true,
    subscribers: 231,
    features: [
      "Up to 100 cases/month",
      "Premium STL viewer links",
      "Priority email + chat support",
      "Fast turnaround (48h)",
      "3 revisions per project",
      "Portfolio showcase",
    ],
  },
  {
    key: "scale",
    name: "Scale",
    icon: Star,
    price: 199,
    interval: "month",
    description: "For top-tier designers scaling their full practice.",
    color: "text-emerald-500",
    borderColor: "border-emerald-500/40",
    active: true,
    subscribers: 124,
    features: [
      "Unlimited cases",
      "Custom STL viewer branding",
      "Dedicated account manager",
      "Rush turnaround (24h)",
      "Unlimited revisions",
      "Featured designer badge",
      "Analytics dashboard",
      "Commission rate reduction",
    ],
  },
];

const SERVICE_CATEGORIES = [
  {
    name: "Full Arch Restoration",
    basePrice: "$320–$480",
    commission: "15%",
    active: true,
  },
  {
    name: "Crown (per unit)",
    basePrice: "$80–$120",
    commission: "15%",
    active: true,
  },
  {
    name: "Implant Bar",
    basePrice: "$240–$380",
    commission: "15%",
    active: true,
  },
  {
    name: "Veneer (per unit)",
    basePrice: "$60–$100",
    commission: "15%",
    active: true,
  },
  {
    name: "Bridge (per unit)",
    basePrice: "$80–$130",
    commission: "15%",
    active: true,
  },
  {
    name: "Overdenture",
    basePrice: "$280–$420",
    commission: "15%",
    active: true,
  },
  {
    name: "Wax-up / Diagnostic",
    basePrice: "$120–$200",
    commission: "10%",
    active: false,
  },
  {
    name: "Nightguard / Splint",
    basePrice: "$80–$140",
    commission: "10%",
    active: false,
  },
];

export default function PricingPlansPage() {
  const [annualBilling, setAnnualBilling] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pricing Plans</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage subscription tiers and service category pricing.
          </p>
        </div>
        <Button size="sm" className="gap-2 h-9 text-xs">
          <Plus size={13} />
          Add Plan
        </Button>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-medium ${!annualBilling ? "text-foreground" : "text-muted-foreground"}`}
        >
          Monthly
        </span>
        <Switch checked={annualBilling} onCheckedChange={setAnnualBilling} />
        <span
          className={`text-sm font-medium ${annualBilling ? "text-foreground" : "text-muted-foreground"}`}
        >
          Annual
          <span className="ml-2 text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Save 20%
          </span>
        </span>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((plan) => {
          const price = annualBilling
            ? Math.round(plan.price * 0.8)
            : plan.price;
          return (
            <Card
              key={plan.key}
              className={`bg-card border-2 relative ${plan.highlighted ? plan.borderColor : "border-border"}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardContent className="p-6 space-y-5">
                {/* Plan header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className={`flex items-center gap-2 mb-1 ${plan.color}`}
                    >
                      <plan.icon size={16} />
                      <span className="font-bold text-lg text-foreground">
                        {plan.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-8 p-0 text-muted-foreground"
                      >
                        <MoreHorizontal size={15} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 focus:text-red-500">
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${price}
                    </span>
                    <span className="text-sm text-muted-foreground mb-1.5">
                      /month
                    </span>
                  </div>
                  {annualBilling && (
                    <p className="text-xs text-muted-foreground">
                      Billed annually (${price * 12}/yr)
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={13}
                        className="text-emerald-500 mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Subscribers */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {plan.subscribers} active subscribers
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${plan.active ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"}`}
                  >
                    {plan.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Service category pricing */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Service Category Pricing
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Fixed price ranges and commission rates per service type.
              </p>
            </div>
            <Button size="sm" className="gap-2 h-8 text-xs">
              <Plus size={12} />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Service
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Price Range
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Commission
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {SERVICE_CATEGORIES.map((s) => (
              <TableRow
                key={s.name}
                className="border-border hover:bg-muted/40"
              >
                <TableCell className="pl-6 text-sm font-medium text-foreground">
                  {s.name}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {s.basePrice}
                </TableCell>
                <TableCell className="text-sm text-foreground font-medium">
                  {s.commission}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${s.active ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"}`}
                  >
                    {s.active ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal size={15} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>
                        {s.active ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
