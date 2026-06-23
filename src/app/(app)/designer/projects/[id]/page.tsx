"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  HelpCircle,
  MessageCircle,
  Triangle,
  Upload,
} from "lucide-react";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";

const PROJECT = {
  id: "PRJ-1042",
  title: "UPPER CROWN ALIGNMENT",
  status: "In Progress",
  practice: {
    name: "Bright Smiles Dental",
    location: "New York, NY",
    initials: "BS",
  },
};

const PRACTICE_FILES = [
  { name: "prescription.pdf", size: "1.1 MB" },
  { name: "scan_patient_2847.stl", size: "32.1 MB" },
  { name: "reference_notes.pdf", size: "0.8 MB" },
];

const MESSAGES = [
  {
    id: 1,
    from: "practice",
    text: "Please note that the marginal width should not exceed 0.5mm for this case.",
    time: "10:14 AM",
  },
  {
    id: 2,
    from: "me",
    text: "Got it. I have reviewed the case guidelines. The alignment layout looks standard — will proceed.",
    time: "10:30 AM",
  },
];

const MY_FILES = [
  { name: "crown_alignment_v1.stl", size: "4.2 MB", time: "Today, 08:30 AM" },
  { name: "upper_arch_scan.stl", size: "6.8 MB", time: "Yesterday, 03:15 PM" },
];

const LIFECYCLE = [
  {
    label: "Work In Progress",
    time: "Today, 09:15 AM",
    dot: "bg-blue-500",
    text: "text-blue-500",
  },
  {
    label: "Job Accepted",
    time: "Yesterday, 04:30 PM",
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
  {
    label: "Job Received",
    time: "Yesterday, 11:00 AM",
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
];

export default function DesignerProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  use(params);
  const [message, setMessage] = useState("");
  const [myFiles, setMyFiles] = useState(MY_FILES);

  return (
    <div className="-m-6 flex flex-col lg:flex-row lg:overflow-hidden lg:h-[calc(100dvh-70px)]">
      {/* Left panel — Case Files */}
      <div className="w-full lg:w-65 shrink-0 bg-white border-b border-border/60 lg:border-b-0 lg:border-r flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Case Files</h2>
        </div>

        {/* Practice card */}
        <div className="px-4 pt-3 pb-3">
          <div className="rounded-xl border border-border/60 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">
                {PROJECT.id}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-500 border border-amber-200">
                {PROJECT.status}
              </span>
            </div>
            <p className="text-sm font-bold text-primary uppercase tracking-wide">
              {PROJECT.title}
            </p>
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                {PROJECT.practice.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {PROJECT.practice.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {PROJECT.practice.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Files from practice — download only */}
        <div className="px-4 pb-3 border-t border-border/60 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Files from Practice
          </p>
          <div className="space-y-2">
            {PRACTICE_FILES.map((f, i) => (
              <div
                key={`${f.name}-${i}`}
                className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText size={16} className="text-rose-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {f.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {f.size}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-2"
                  title="Download"
                >
                  <Download size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My design files */}
        <div className="px-4 pb-3 border-t border-border/60 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Your Design Files
          </p>
          <div className="space-y-2 mb-3">
            {myFiles.map((f, i) => (
              <div
                key={`mf-${f.name}-${i}`}
                className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText size={16} className="text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {f.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {f.size} · {f.time}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-2"
                  title="Download"
                >
                  <Download size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* Upload zone */}
          <button
            type="button"
            className="w-full border border-dashed border-border/60 rounded-xl px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-muted/20 transition-colors"
            onClick={() =>
              setMyFiles((prev) => [
                ...prev,
                {
                  name: `design_v${prev.length + 1}.stl`,
                  size: "14.2 MB",
                  time: "Just now",
                },
              ])
            }
          >
            <div className="size-8 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
              <Upload size={14} className="text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground">
                Upload design file
              </p>
              <p className="text-[10px] text-muted-foreground">
                STL, OBJ, DCM · max 50MB
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Center panel — viewer + chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 3D viewer */}
        <div className="flex-1 min-h-65 lg:min-h-0 bg-[#dde1e8] flex flex-col items-center justify-center gap-3">
          <Triangle size={40} className="text-[#b4bac6] stroke-[1.2]" />
          <p className="text-sm text-[#b4bac6] font-medium">
            [3D Active Viewer Window Elements Loaded Here]
          </p>
        </div>

        {/* Chat with practice */}
        <div className="bg-white border-t border-border/60 flex flex-col">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/60">
            <MessageCircle size={15} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              Practice Chat
            </span>
          </div>
          <div className="px-5 py-3 space-y-3 overflow-y-auto max-h-36">
            {MESSAGES.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[72%] rounded-2xl px-4 py-2.5 ${
                    m.from === "me"
                      ? "bg-teal-100 text-teal-900"
                      : "bg-muted/50 text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      m.from === "me"
                        ? "text-right text-teal-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 px-5 py-3 border-t border-border/60">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message the practice..."
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <Button
              size="sm"
              className="h-8 px-4 text-xs bg-foreground text-background hover:bg-foreground/90"
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Right panel — designer actions + lifecycle */}
      <div className="w-full lg:w-55 shrink-0 bg-white border-t border-border/60 lg:border-t-0 lg:border-l flex flex-col overflow-y-auto p-4 gap-3">
        <Button className="w-full gap-2 text-xs! bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
          <CheckCircle2 size={15} />
          Submit Design
        </Button>

        <div className="grid grid-cols-1 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1 text-[11px] h-8 px-2"
          >
            <HelpCircle size={11} />
            Request Clarification
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1 text-[11px] h-8 px-2 border-amber-400! text-amber-600! hover:bg-amber-50!"
          >
            <AlertTriangle size={11} />
            Flag Issue
          </Button>
        </div>

        <div className="pt-2">
          <p className="text-sm font-semibold text-foreground mb-4">
            Project Process Lifecycle
          </p>
          <div className="space-y-0">
            {LIFECYCLE.map((item, i) => (
              <div
                key={item.label}
                className={`flex gap-3 relative ${i < LIFECYCLE.length - 1 ? "pb-6" : ""}`}
              >
                {i < LIFECYCLE.length - 1 && (
                  <div className="absolute left-[6px] top-4 bottom-0 w-0.5 bg-border" />
                )}
                <div
                  className={`size-3.5 rounded-full shrink-0 mt-0.5 z-10 ${item.dot}`}
                />
                <div>
                  <p className={`text-xs font-semibold ${item.text}`}>
                    {item.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
