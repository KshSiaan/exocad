"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  ArrowLeft,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ── Types & Data ──────────────────────────────────────────────────────────────

type Status = "Available" | "Busy" | "Not Available";
type Experience = "junior" | "mid" | "senior" | "expert";

interface Designer {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  status: Status;
  specializations: string[];
  projects: number;
  priceMin: number;
  priceMax: number;
  experience: Experience;
}

const DESIGNERS: Designer[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 4.9,
    reviews: 127,
    status: "Available",
    specializations: ["Crown & Bridge", "Implants", "Full Arch", "Veneers"],
    projects: 450,
    priceMin: 85,
    priceMax: 120,
    experience: "senior",
  },
  {
    id: 2,
    name: "Dr. James Chen",
    location: "Los Angeles, USA",
    rating: 5,
    reviews: 203,
    status: "Busy",
    specializations: [
      "Crown & Bridge",
      "Implants",
      "Full Arch",
      "Orthodontics",
    ],
    projects: 450,
    priceMin: 100,
    priceMax: 150,
    experience: "expert",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Miami, USA",
    rating: 4.8,
    reviews: 89,
    status: "Available",
    specializations: ["Crown & Bridge", "Implants", "Full Arch", "Dentures"],
    projects: 450,
    priceMin: 75,
    priceMax: 110,
    experience: "mid",
  },
  {
    id: 4,
    name: "Michael Zhang",
    location: "Chicago, USA",
    rating: 4.9,
    reviews: 156,
    status: "Available",
    specializations: ["Crown & Bridge", "Implants", "Full Arch", "Veneers"],
    projects: 450,
    priceMin: 90,
    priceMax: 130,
    experience: "senior",
  },
  {
    id: 5,
    name: "Emily Thompson",
    location: "Seattle, USA",
    rating: 4.7,
    reviews: 74,
    status: "Available",
    specializations: ["Crown & Bridge", "Implants", "Full Arch", "Dentures"],
    projects: 450,
    priceMin: 70,
    priceMax: 100,
    experience: "mid",
  },
  {
    id: 6,
    name: "David Kim",
    location: "Boston, USA",
    rating: 5,
    reviews: 189,
    status: "Not Available",
    specializations: [
      "Crown & Bridge",
      "Implants",
      "Full Arch",
      "Orthodontics",
    ],
    projects: 450,
    priceMin: 95,
    priceMax: 140,
    experience: "expert",
  },
];

interface Filters {
  experience: string;
  specialization: string;
  availability: string;
}

const FILTER_DEFS = [
  {
    label: "Experience",
    key: "experience" as keyof Filters,
    options: [
      { value: "junior", label: "Junior" },
      { value: "mid", label: "Mid-level" },
      { value: "senior", label: "Senior" },
      { value: "expert", label: "Expert" },
    ],
  },
  {
    label: "Specialization",
    key: "specialization" as keyof Filters,
    options: [
      { value: "Crown & Bridge", label: "Crown & Bridge" },
      { value: "Implants", label: "Implants" },
      { value: "Full Arch", label: "Full Arch" },
      { value: "Veneers", label: "Veneers" },
      { value: "Orthodontics", label: "Orthodontics" },
      { value: "Dentures", label: "Dentures" },
    ],
  },
  {
    label: "Availability",
    key: "availability" as keyof Filters,
    options: [
      { value: "Available", label: "Available" },
      { value: "Busy", label: "Busy" },
      { value: "Not Available", label: "Not Available" },
    ],
  },
] as const;

const EMPTY_FILTERS: Filters = {
  experience: "",
  specialization: "",
  availability: "",
};

const STATUS_STYLES: Record<Status, string> = {
  Available: "bg-green-500/15 text-green-400 border border-green-500/30",
  Busy: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  "Not Available": "bg-red-500/15 text-red-400 border border-red-500/30",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const HONORIFICS = new Set(["dr.", "mr.", "mrs.", "ms.", "prof."]);

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => !HONORIFICS.has(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
      )}
    >
      {status}
    </span>
  );
}

function SpecializationTags({
  specializations,
}: {
  specializations: string[];
}) {
  const shown = specializations.slice(0, 3);
  const extra = specializations.length - 3;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((spec, i) => (
        <span
          key={spec}
          className={cn(
            "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
            i === 0
              ? "bg-primary text-primary-foreground"
              : "border border-border/60 bg-muted/30 text-muted-foreground",
          )}
        >
          {spec}
        </span>
      ))}
      {extra > 0 && (
        <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          •••
        </span>
      )}
    </div>
  );
}

function DesignerCard({ designer }: { designer: Designer }) {
  const initials = getInitials(designer.name);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">
              {designer.name}
            </p>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{designer.location}</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <Star className="size-3 shrink-0 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-foreground">
                {designer.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({designer.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
        <StatusBadge status={designer.status} />
      </div>

      {/* Specializations */}
      <SpecializationTags specializations={designer.specializations} />

      {/* Projects */}
      <p className="text-sm font-medium text-foreground">
        {designer.projects} projects
      </p>

      {/* Footer */}
      <div className="flex items-end justify-between gap-2 border-t pt-4">
        <div>
          <p className="text-lg font-bold text-foreground">
            ${designer.priceMin}–${designer.priceMax}
          </p>
          <p className="text-xs text-muted-foreground">per hour</p>
        </div>
        <Button size="lg" className="shrink-0 gap-1.5">
          <Mail className="size-3.5" />
          Send Email
        </Button>
      </div>
    </div>
  );
}

function FilterPanel({
  filters,
  setFilters,
  onClear,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onClear: () => void;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-foreground">Filters</h2>
      <Separator />
      <div className="space-y-4">
        {FILTER_DEFS.map(({ label, key, options }) => (
          <div key={key} className="space-y-1.5">
            <p className="text-xs text-muted-foreground">{label}</p>
            <Select
              value={filters[key]}
              onValueChange={(v) =>
                setFilters((prev) => ({ ...prev, [key]: v }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="text-sm text-primary transition-colors hover:text-primary/80"
      >
        Clear All Filters
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DesignersPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const filtered = useMemo(() => {
    return DESIGNERS.filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q);
      const matchesExperience =
        !filters.experience || d.experience === filters.experience;
      const matchesSpec =
        !filters.specialization ||
        d.specializations.includes(filters.specialization);
      const matchesAvailability =
        !filters.availability || d.status === filters.availability;
      return (
        matchesSearch && matchesExperience && matchesSpec && matchesAvailability
      );
    });
  }, [search, filters]);

  const clearFilters = () => setFilters(EMPTY_FILTERS);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* Search bar */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 pl-10 text-sm"
              placeholder="Search designers by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Mobile: open sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-12 shrink-0 gap-2 px-4 lg:hidden"
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6">
              <SheetHeader className="mb-5 p-0">
                <SheetTitle className="text-left">Filters</SheetTitle>
              </SheetHeader>
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onClear={clearFilters}
              />
            </SheetContent>
          </Sheet>

          {/* Desktop: decorative filters icon button */}
          {/* <Button
            variant="outline"
            className="hidden h-12 shrink-0 gap-2 px-4 lg:inline-flex"
            aria-hidden
            tabIndex={-1}
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </Button> */}
        </div>

        <Separator className="mb-6" />

        {/* Main layout */}
        <div className="grid grid-cols-5 gap-8">
          {/* Sidebar — desktop only */}
          <aside className="hidden w-full shrink-0 lg:block">
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0 col-span-5 lg:col-span-4">
            <h1 className="mb-5 text-xl font-bold text-foreground">
              {filtered.length} Designer{filtered.length !== 1 ? "s" : ""} Found
            </h1>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card py-16 text-center">
                <p className="text-base font-medium text-foreground">
                  No designers found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    clearFilters();
                  }}
                >
                  Clear all
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((designer) => (
                  <DesignerCard key={designer.id} designer={designer} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
