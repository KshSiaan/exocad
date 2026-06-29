"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ClockIcon,
  Download,
  FileText,
  HelpCircle,
  MessageCircle,
  Triangle,
  Upload,
  UploadIcon,
} from "lucide-react";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

  const practiceData = [
    { title: "Project ID", value: PROJECT.id },
    { title: "Practice Name", value: PROJECT.practice.name },
    { title: "Location", value: PROJECT.practice.location },
    { title: "Project Status", value: PROJECT.status },
  ];

  return (
    <div className="overflow-hidden lg:h-[calc(100dvh-124px)] grid grid-cols-4 gap-6">
      <div className="col-span-3 space-y-6">
        <h2 className="text-lg font-semibold mb-2 text-foreground">
          Full Arch Implant Bar — Patient #2847
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Received Files (from dentist)</CardTitle>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge>STL</Badge>
                  <div className="">
                    <p className="font-medium">Scan_patient_2847.stl</p>
                    <p className="text-xs text-muted-foreground">
                      32.1 MB · Jun 5, 09:15 AM
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="gap-2">
                  <Download size={14} />
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Your Uploaded Files</CardTitle>
            <Button variant="outline" size="sm">
              <UploadIcon /> Upload File
            </Button>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge>STL</Badge>
                  <div className="">
                    <p className="font-medium">Scan_patient_2847.stl</p>
                    <p className="text-xs text-muted-foreground">
                      32.1 MB · Jun 5, 09:15 AM
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="gap-2">
                  <Download size={14} />
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-rows-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <div className="px-4 space-y-2">
            {practiceData.map((item) => (
              <div className="flex justify-between" key={item.title}>
                <span className="font-semibold text-muted-foreground/60">
                  {item.title}
                </span>
                <span className="text-foreground font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
            <Separator />
            <CardTitle className="text-sm font-semibold">Case Notes</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Patient is fully edentulous maxillary arch. All-on-6 protocol.
              Titanium bar preferred. Milled output — please optimize for
              CADCAM. Contact any prior to finalization. Nobel Biocare MultiUnit
              17°, standard platform, gingival height ~3mm.
            </CardDescription>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex item-center">
              <ClockIcon className="size-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
