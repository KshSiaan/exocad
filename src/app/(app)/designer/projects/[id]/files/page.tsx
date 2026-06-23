"use client";

import { ArrowLeft, Download, FileText, Upload, X } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";

const JOB = {
  id: "PRJ-1042",
  title: "Full Arch Implant Bar — Patient #2847",
  practice: "Bright Smiles Dental",
};

const FILES_RECEIVED = [
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
];

const FILES_UPLOADED = [
  {
    name: "full_arch_bar_v1.stl",
    size: "18.4 MB",
    time: "Jun 7, 10:22 AM",
    type: "STL",
  },
];

const TYPE_COLOR: Record<string, string> = {
  STL: "bg-blue-50 text-blue-600",
  PDF: "bg-rose-50 text-rose-500",
  OBJ: "bg-violet-50 text-violet-600",
  DCM: "bg-amber-50 text-amber-600",
};

function FileRow({
  file,
  onRemove,
}: {
  file: { name: string; size: string; time: string; type: string };
  onRemove?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`size-9 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${TYPE_COLOR[file.type] ?? "bg-muted text-muted-foreground"}`}
        >
          {file.type}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {file.size} · {file.time}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-4">
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 text-muted-foreground hover:text-foreground"
          title="Download"
        >
          <Download size={14} />
        </Button>
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 text-muted-foreground hover:text-red-500"
            onClick={onRemove}
            title="Remove"
          >
            <X size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function JobFilesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  use(params);
  const [uploaded, setUploaded] = useState(FILES_UPLOADED);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/designer/projects"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="text-xs font-mono text-muted-foreground">{JOB.id}</p>
          <h1 className="text-lg font-bold text-foreground leading-tight">
            {JOB.title}
          </h1>
          <p className="text-xs text-muted-foreground">{JOB.practice}</p>
        </div>
      </div>

      {/* Received files */}
      <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border/60 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Case Files from Practice
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Scans and references submitted with the request
            </p>
          </div>
          <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded">
            {FILES_RECEIVED.length} files
          </span>
        </div>
        {FILES_RECEIVED.map((f) => (
          <FileRow key={f.name} file={f} />
        ))}
      </div>

      {/* Uploaded files */}
      {/* <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border/60 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Your Design Files
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Files you have uploaded for this job
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs"
            onClick={() =>
              setUploaded((prev) => [
                ...prev,
                {
                  name: `design_v${prev.length + 1}.stl`,
                  size: "14.2 MB",
                  time: "Just now",
                  type: "STL",
                },
              ])
            }
          >
            <Upload size={12} />
            Upload
          </Button>
        </div>

        {uploaded.length > 0 ? (
          uploaded.map((f) => (
            <FileRow
              key={f.name}
              file={f}
              onRemove={() =>
                setUploaded((prev) => prev.filter((x) => x.name !== f.name))
              }
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <FileText size={28} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No files uploaded yet</p>
            <p className="text-xs text-muted-foreground/60">
              Use the Upload button to add your design files
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
}
