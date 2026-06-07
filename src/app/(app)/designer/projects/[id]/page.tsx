"use client";

import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  Send,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const JOB = {
  id: "PRJ-1042",
  title: "Full Arch Implant Bar — Patient #2847",
  practice: "Bright Smiles Dental",
  dentist: "Dr. Brian Martinez",
  type: "Implant Bar",
  status: "Under Review",
  priority: "Express",
  created: "Jun 5, 2024",
  due: "Jun 9, 2024",
  fee: "$145",
  software: "exocad",
  notes:
    "Patient is fully edentulous maxillary arch. All-on-6 protocol. Titanium bar preferred. Milled output — please optimize for CADCAM. Contact any prior to finalization. Nobel Biocare MultiUnit 17°, standard platform, gingival height ~3mm.",
  timeline: [
    { label: "Job Received", time: "Jun 5, 09:14 AM", done: true },
    { label: "Accepted", time: "Jun 5, 11:30 AM", done: true },
    { label: "Design Started", time: "Jun 6, 02:00 PM", done: true },
    { label: "Files Uploaded", time: "Jun 7, 10:22 AM", done: true },
    { label: "Revision Requested", time: "", done: false },
    { label: "Final Approved", time: "", done: false },
  ],
  files_uploaded: [
    {
      name: "full_arch_bar_v1.stl",
      size: "18.4 MB",
      time: "Jun 7, 10:22 AM",
      type: "STL",
    },
  ],
  files_received: [
    {
      name: "scan_patient_2847.stl",
      size: "32.1 MB",
      time: "Jun 5, 09:15 AM",
      type: "STL",
    },
    {
      name: "reference_notes.pdf",
      size: "0.8 MB",
      time: "Jun 5, 09:15 AM",
      type: "PDF",
    },
  ],
};

const MESSAGES = [
  {
    from: "Dr. Brian Martinez",
    initials: "DM",
    time: "Jun 5, 09:16 AM",
    text: "Hi Sarah! I've attached the scan files. We're using Nobel Biocare MultiUnit 17° — standard platform. Height of gingival tissues is ~3mm. Let me know if you need anything else.",
  },
  {
    from: "Sarah Chen",
    initials: "SC",
    time: "Jun 5, 11:32 AM",
    text: "Thanks Dr. Martinez! Those specs are perfect. I'll start working on the design now and aim to have a draft ready by tomorrow morning.",
  },
  {
    from: "Sarah Chen",
    initials: "SC",
    time: "Jun 7, 10:25 AM",
    text: "I've uploaded version 1 of the implant bar. Please review the emergence profiles and contacts. I'm particularly happy with the anterior region. Let me know your thoughts!",
  },
];

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-blue-50 text-blue-600 border-blue-200",
  "Under Review": "bg-amber-50 text-amber-600 border-amber-200",
  Revision: "bg-purple-50 text-purple-600 border-purple-200",
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function DesignerJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  use(params);
  const [message, setMessage] = useState("");
  const [newFiles, setNewFiles] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/designer/projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground">
                {JOB.id}
              </span>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[JOB.status]}`}
              >
                {JOB.status}
              </span>
              <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                {JOB.priority}
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground">{JOB.title}</h1>
          </div>
        </div>
        <Button
          size="sm"
          className="gap-2 text-xs h-9 bg-emerald-600 hover:bg-emerald-700 shrink-0"
        >
          <CheckCircle size={13} />
          Mark Ready for Review
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Files: received */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Received Files (from practice)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {JOB.files_received.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between bg-muted/30 rounded-lg px-4 py-3 border border-border/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                      {f.type}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {f.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {f.size} · {f.time}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-muted-foreground"
                  >
                    <Download size={14} />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Files: uploaded by designer */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Your Uploaded Files</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-8 text-xs"
                  onClick={() =>
                    setNewFiles((prev) => [
                      ...prev,
                      `design_v${prev.length + 2}.stl`,
                    ])
                  }
                >
                  <Upload size={12} />
                  Upload File
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                ...JOB.files_uploaded,
                ...newFiles.map((n) => ({
                  name: n,
                  size: "14.2 MB",
                  time: "Just now",
                  type: "STL",
                })),
              ].map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between bg-muted/30 rounded-lg px-4 py-3 border border-border/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {f.type}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {f.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {f.size} · {f.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0 text-muted-foreground"
                    >
                      <Download size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0 text-muted-foreground hover:text-red-500"
                      onClick={() =>
                        setNewFiles((prev) => prev.filter((n) => n !== f.name))
                      }
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              {JOB.files_uploaded.length === 0 && newFiles.length === 0 && (
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-border/60 rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
                  onClick={() =>
                    setNewFiles((prev) => [...prev, "design_v1.stl"])
                  }
                >
                  <Upload className="size-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload design files
                  </p>
                </button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Job info */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-sm">
              {[
                { label: "Practice", value: JOB.practice },
                { label: "Dentist", value: JOB.dentist },
                { label: "Service Type", value: JOB.type },
                { label: "Software", value: JOB.software },
                { label: "Created", value: JOB.created },
                { label: "Due Date", value: JOB.due },
                { label: "Your Fee", value: JOB.fee },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-muted-foreground">{r.label}</span>
                  <span
                    className={`font-medium text-foreground ${r.label === "Your Fee" ? "text-emerald-600 font-bold" : ""}`}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
              <Separator />
              <div>
                <p className="text-muted-foreground text-xs mb-1.5">
                  Case Notes
                </p>
                <p className="text-xs text-foreground leading-relaxed">
                  {JOB.notes}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock size={14} />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {JOB.timeline.map((t, i) => (
                  <div
                    key={t.label}
                    className={`flex gap-3 ${i < JOB.timeline.length - 1 ? "pb-4" : ""} relative`}
                  >
                    {i < JOB.timeline.length - 1 && (
                      <div
                        className={`absolute left-[11px] top-5 bottom-0 w-px ${t.done ? "bg-primary/40" : "bg-border"}`}
                      />
                    )}
                    <div
                      className={`size-6 rounded-full flex items-center justify-center shrink-0 z-10 ${t.done ? "bg-primary text-primary-foreground" : "bg-muted border border-border"}`}
                    >
                      {t.done && <CheckCircle size={12} />}
                    </div>
                    <div className="pt-0.5">
                      <p
                        className={`text-xs font-medium ${t.done ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {t.label}
                      </p>
                      {t.time && (
                        <p className="text-[10px] text-muted-foreground">
                          {t.time}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
