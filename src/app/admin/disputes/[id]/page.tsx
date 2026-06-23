"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  FileText,
  Mail,
  Paperclip,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DISPUTES, STATUS_STYLES } from "../data";

const STATS = [
  { label: "DISPUTE RESOLUTION CENTER", value: "124" },
  { label: "OPEN", value: "124" },
  { label: "RESOLVED", value: "124" },
  { label: "REFUND PENDING", value: "124" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function DisputeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispute = DISPUTES.find((d) => d.uid === id);

  const [activeTab, setActiveTab] = useState<"dentist" | "designer">("dentist");
  const [message, setMessage] = useState("");

  if (!dispute) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground text-sm">Dispute not found.</p>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-6">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">
                {s.label}
              </p>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} />
        Back to disputes
      </button>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        {/* Left — dispute info */}
        <div className="space-y-5">
          {/* Designer party */}
          <div className="flex items-center gap-4">
            <Avatar className="size-16 rounded-xl overflow-hidden">
              <AvatarFallback className="text-base font-semibold bg-primary/10 text-primary rounded-xl">
                {initials(dispute.designer)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">
                  {dispute.designer}
                </span>
                <span className="text-xs font-semibold bg-foreground text-background px-2 py-0.5 rounded">
                  Designer
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail size={13} />
                {dispute.designerEmail}
              </div>
            </div>
          </div>

          {/* Dentist party */}
          <div className="flex items-center gap-4">
            <Avatar className="size-16 rounded-xl overflow-hidden">
              <AvatarFallback className="text-base font-semibold bg-muted text-muted-foreground rounded-xl">
                {initials(dispute.dentist)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">
                  {dispute.dentist}
                </span>
                <span className="text-xs font-semibold border border-border text-foreground px-2 py-0.5 rounded">
                  Dentist
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail size={13} />
                {dispute.dentistEmail}
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div>
            <span
              className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${STATUS_STYLES[dispute.status]}`}
            >
              {dispute.status}
            </span>
          </div>

          {/* Reason card */}
          <div className="rounded-xl border border-border bg-muted/40 p-5 flex gap-4">
            <div className="size-10 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0">
              <AlertCircle size={18} className="text-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {dispute.reasonTitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dispute.reason}
              </p>
            </div>
          </div>

          {/* Desntist scan files */}
          {dispute.files.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Desntist scan files
              </p>
              <div className="flex flex-wrap gap-2">
                {dispute.files.map((f) => (
                  <button
                    key={f}
                    className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                  >
                    <FileText size={13} className="text-muted-foreground" />
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resolution */}
          {dispute.resolution && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                Resolution
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {dispute.resolution}
              </p>
            </div>
          )}
        </div>

        {/* Right — admin messaging */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            {(["dentist", "designer"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Admin to {tab === "dentist" ? "Dentist" : "Designer"}
              </button>
            ))}
          </div>

          {/* Message area */}
          <div className="flex-1 min-h-[380px] p-4 text-sm text-muted-foreground">
            <p className="text-center mt-16 text-xs">
              No messages yet. Start the conversation below.
            </p>
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex items-center gap-2 bg-muted/30">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <Paperclip size={16} />
            </button>
            <input
              type="text"
              placeholder={`Message ${activeTab === "dentist" ? "Dentist" : "Designer"}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              className="size-9 rounded-lg bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
              onClick={() => setMessage("")}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
