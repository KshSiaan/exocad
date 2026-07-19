"use client";

import {
  ArrowLeft,
  CheckCircle,
  Search,
  Star,
  Upload,
  X,
  XIcon,
} from "lucide-react";
import Link from "next/link";
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
import { Textarea } from "@/components/ui/textarea";

const DESIGNERS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    rating: 4.9,
    reviews: 127,
    status: "Available",
    specializations: ["Crown & Bridge", "Implants", "Full Arch"],
    price: "$85–$120",
    turnaround: "24–48 hrs",
  },
  {
    id: 2,
    name: "Marcus Weber",
    rating: 4.8,
    reviews: 98,
    status: "Available",
    specializations: ["Crown & Bridge", "Veneers", "Implants"],
    price: "$90–$130",
    turnaround: "36–48 hrs",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    rating: 4.9,
    reviews: 156,
    status: "Available",
    specializations: ["Veneers", "Crown & Bridge", "Full Arch"],
    price: "$80–$115",
    turnaround: "24–36 hrs",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    rating: 4.7,
    reviews: 74,
    status: "Busy",
    specializations: ["Implants", "Full Arch", "Implant Bars"],
    price: "$95–$140",
    turnaround: "48–72 hrs",
  },
];

const SERVICE_TYPES = [
  "Crown & Bridge",
  "Implant Bar",
  "Full Arch / All-on-X",
  "Veneers",
  "Implant Abutment",
  "Removable Partial Denture",
  "Complete Denture",
  "Orthodontic Model",
  "Other",
];
const PRIORITIES = [
  "Standard (48–72 hrs)",
  "Express (24–48 hrs)",
  "Rush (12–24 hrs)",
];
const SOFTWARES = ["exocad", "3Shape", "Dental Wings", "No Preference"];

export default function NewProjectPage() {
  const [selectedDesigner, setSelectedDesigner] = useState<number | null>(null);
  const [designerSearch, setDesignerSearch] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitted, setSubmitted] = useState(false);

  const filteredDesigners = DESIGNERS.filter(
    (d) =>
      !designerSearch ||
      d.name.toLowerCase().includes(designerSearch.toLowerCase()) ||
      d.specializations.some((s) =>
        s.toLowerCase().includes(designerSearch.toLowerCase()),
      ),
  );

  const mockAddFile = () => {
    setFiles((prev) => [...prev, `scan_patient_${Date.now()}.stl`]);
  };

  if (submitted) {
    return (
      <div className="mx-auto py-16 text-center space-y-5">
        <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Project Submitted!
          </h2>
          <p className="text-muted-foreground mt-2">
            Your project has been sent to the designer. You'll be notified once
            they accept.
          </p>
        </div>
        <div className="bg-muted/40 rounded-xl p-4 text-sm text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project ID</span>
            <span className="font-mono font-semibold">PRJ-1043</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Assigned to</span>
            <span className="font-semibold">
              {selectedDesigner
                ? DESIGNERS.find((d) => d.id === selectedDesigner)?.name
                : "Auto-assigned"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="text-amber-600 font-medium">
              Pending Acceptance
            </span>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
          <Button asChild>
            <Link href="/projects/PRJ-1043">Track Project</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">New Project</h1>
          <p className="text-sm text-muted-foreground">
            Submit a CAD design request
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-0">
        {(
          ["Case Details", "Choose Designer", "Upload Files", "Review"] as const
        ).map((s, i) => {
          const stepNum = (i + 1) as 1 | 2 | 3 | 4;
          const done = step > stepNum;
          const active = step === stepNum;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? "bg-emerald-500 text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {done ? <CheckCircle size={14} /> : stepNum}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s}
                </span>
              </div>
              {i < 3 && <div className="flex-1 h-px bg-border mx-3" />}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Project Title</Label>
                <Input
                  placeholder="e.g. Crown & Bridge — Patient #2024"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Service Type</Label>
                <Select>
                  <SelectTrigger className="h-10! w-full">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Case Notes</Label>
              <Textarea
                placeholder="Describe the case — teeth involved, material, occlusion notes, patient considerations, etc."
                className="min-h-[100px] resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Choose a Designer</CardTitle>
              {selectedDesigner && (
                <button
                  type="button"
                  onClick={() => setSelectedDesigner(null)}
                  className="text-xs text-destructive hover:text-foreground flex items-center gap-1"
                >
                  <XIcon className="size-4" size={16} /> Clear selection
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={designerSearch}
                onChange={(e) => setDesignerSearch(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-muted pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {filteredDesigners.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No designers match your search.
              </p>
            )}
            {filteredDesigners.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() =>
                  d.status === "Available" && setSelectedDesigner(d.id)
                }
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  d.status !== "Available"
                    ? "opacity-50 cursor-not-allowed border-border/40"
                    : selectedDesigner === d.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border/60 hover:border-primary/40 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                    {d.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-foreground">
                        {d.name}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${d.status === "Available" ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground"}`}
                      >
                        {d.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-foreground">
                        {d.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({d.reviews})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {d.specializations.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">
                      {d.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.turnaround}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            <p className="text-xs text-muted-foreground text-center pt-2">
              Or leave unselected and we'll match you automatically.
            </p>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}
      {step === 3 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Upload Scan Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4"></CardContent>
        </Card>
      )}
      {step === 4 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Upload Scan Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drop zone */}
            <button
              type="button"
              className="w-full border-2 border-dashed border-border/60 rounded-xl p-10 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              onClick={mockAddFile}
            >
              <Upload className="size-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-sm text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                STL, OBJ, DCM, ZIP — Max 500 MB per file
              </p>
            </button>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div
                    key={f}
                    className="flex items-center justify-between bg-muted/40 rounded-lg px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                        STL
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {f}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFiles((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setSubmitted(true)}>Submit Project</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
