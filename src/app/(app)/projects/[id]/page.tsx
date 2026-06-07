"use client";

import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  FileText,
  MessageSquare,
  RefreshCw,
  Send,
  Star,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PROJECT = {
  id: "PRJ-1042",
  title: "Full Arch Implant Bar — Patient #2847",
  type: "Implant Bar",
  status: "Under Review",
  priority: "Express",
  created: "Jun 5, 2024",
  due: "Jun 9, 2024",
  price: "$145",
  notes:
    "Patient is fully edentulous maxillary arch. All-on-6 protocol. Titanium bar preferred. Milled output — please optimize for CADCAM. Contact any prior to finalization.",
  designer: { name: "Sarah Chen", rating: 4.9, reviews: 127, initials: "SC" },
  timeline: [
    { label: "Project Submitted", time: "Jun 5, 09:14 AM", done: true },
    { label: "Designer Accepted", time: "Jun 5, 11:30 AM", done: true },
    { label: "Design In Progress", time: "Jun 6, 02:00 PM", done: true },
    { label: "Files Uploaded for Review", time: "Jun 7, 10:22 AM", done: true },
    { label: "Revision Requested", time: "", done: false },
    { label: "Final Approved", time: "", done: false },
    { label: "Completed", time: "", done: false },
  ],
  files: [
    {
      name: "full_arch_bar_v1.stl",
      size: "18.4 MB",
      uploaded: "Jun 7, 10:22 AM",
      by: "Sarah Chen",
      type: "STL",
    },
    {
      name: "scan_patient_2847.stl",
      size: "32.1 MB",
      uploaded: "Jun 5, 09:15 AM",
      by: "Dr. Martinez",
      type: "STL",
    },
    {
      name: "reference_notes.pdf",
      size: "0.8 MB",
      uploaded: "Jun 5, 09:15 AM",
      by: "Dr. Martinez",
      type: "PDF",
    },
  ],
};

const MESSAGES = [
  {
    from: "Sarah Chen",
    initials: "SC",
    time: "Jun 5, 11:31 AM",
    text: "Hi Dr. Martinez, I've accepted your case. I'll start working on the implant bar design now. Could you confirm the connector dimensions for the multi-unit abutments you're using?",
  },
  {
    from: "Dr. Martinez",
    initials: "DM",
    time: "Jun 5, 12:05 PM",
    text: "Hi Sarah! We're using Nobel Biocare MultiUnit 17° — standard platform. Height of gingival tissues is ~3mm. Let me know if you need the emergence profile data.",
  },
  {
    from: "Sarah Chen",
    initials: "SC",
    time: "Jun 5, 12:20 PM",
    text: "Perfect, that's exactly what I needed. I'll proceed with those specs and have a draft ready for your review by tomorrow morning.",
  },
  {
    from: "Sarah Chen",
    initials: "SC",
    time: "Jun 7, 10:25 AM",
    text: "I've uploaded the first version of the implant bar. Please check the contacts and emergence profile. I'm particularly happy with the anterior region — let me know your thoughts!",
  },
];

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-blue-50 text-blue-600 border-blue-200",
  "Under Review": "bg-amber-50 text-amber-600 border-amber-200",
  Revision: "bg-purple-50 text-purple-600 border-purple-200",
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  use(params);
  const [message, setMessage] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground">
                {PROJECT.id}
              </span>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[PROJECT.status]}`}
              >
                {PROJECT.status}
              </span>
              <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                {PROJECT.priority}
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {PROJECT.title}
            </h1>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs h-9"
            onClick={() => setShowReviewModal(true)}
          >
            <RefreshCw size={13} />
            Request Revision
          </Button>
          <Button
            size="sm"
            className="gap-2 text-xs h-9 bg-emerald-600 hover:bg-emerald-700"
          >
            <CheckCircle size={13} />
            Approve & Complete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Files */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText size={15} />
                  Files ({PROJECT.files.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-8 text-xs"
                >
                  <Upload size={12} />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {PROJECT.files.map((f) => (
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
                        {f.size} · by {f.by} · {f.uploaded}
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

          {/* Messages */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare size={15} />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-80 overflow-y-auto p-5 space-y-4">
                {MESSAGES.map((m) => {
                  const isMe = m.from === "Dr. Martinez";
                  return (
                    <div
                      key={`${m.from}-${m.time}`}
                      className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isMe ? "bg-blue-100 text-blue-600" : "bg-primary/10 text-primary"}`}
                      >
                        {m.initials}
                      </div>
                      <div
                        className={`max-w-[75%] ${isMe ? "items-end" : ""} flex flex-col gap-1`}
                      >
                        <div
                          className={`flex items-center gap-2 ${isMe ? "flex-row-reverse" : ""}`}
                        >
                          <span className="text-xs font-semibold text-foreground">
                            {m.from}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {m.time}
                          </span>
                        </div>
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted/60 text-foreground rounded-tl-sm"}`}
                        >
                          {m.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 border-t border-border/60 flex gap-3">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="resize-none min-h-[44px] max-h-32 text-sm"
                  rows={1}
                />
                <Button size="sm" className="shrink-0 gap-1.5 h-11 px-4">
                  <Send size={13} />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Project info */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-sm">
              {[
                { label: "Type", value: PROJECT.type },
                { label: "Created", value: PROJECT.created },
                { label: "Due Date", value: PROJECT.due },
                { label: "Price", value: PROJECT.price },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium text-foreground">{r.value}</span>
                </div>
              ))}
              <Separator />
              <div>
                <p className="text-muted-foreground text-xs mb-1.5">
                  Case Notes
                </p>
                <p className="text-xs text-foreground leading-relaxed">
                  {PROJECT.notes}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Designer */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Designer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {PROJECT.designer.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {PROJECT.designer.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">
                      {PROJECT.designer.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({PROJECT.designer.reviews})
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 gap-2 h-8 text-xs"
              >
                <MessageSquare size={12} />
                Message Designer
              </Button>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-white border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock size={14} />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {PROJECT.timeline.map((t, i) => (
                  <div
                    key={t.label}
                    className={`flex gap-3 ${i < PROJECT.timeline.length - 1 ? "pb-4" : ""} relative`}
                  >
                    {i < PROJECT.timeline.length - 1 && (
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

      {/* Revision modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="bg-white w-full max-w-md shadow-2xl">
            <CardHeader>
              <CardTitle>Request Revision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the changes needed (e.g. adjust contact on #13, widen connector profile, etc.)"
                className="min-h-[120px] resize-none"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setShowReviewModal(false)}
                >
                  Send Revision Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
