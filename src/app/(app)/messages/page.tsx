"use client";

import { Paperclip, Search, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Sarah Chen",
    project: "PRJ-1042 · Full Arch Implant Bar",
    last: "I've uploaded the revised STL for your review.",
    time: "10 min",
    unread: 2,
    initials: "SC",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    project: "PRJ-1041 · Crown & Bridge",
    last: "Could you clarify the margin on tooth #14?",
    time: "1 hr",
    unread: 1,
    initials: "ER",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    project: "PRJ-1039 · Anterior Veneers",
    last: "Revision complete — ready for approval.",
    time: "3 hrs",
    unread: 0,
    initials: "YT",
  },
  {
    id: 4,
    name: "Marcus Weber",
    project: "PRJ-1038 · Implant Abutment",
    last: "Starting on the design now.",
    time: "5 hrs",
    unread: 0,
    initials: "MW",
  },
  {
    id: 5,
    name: "James Thompson",
    project: "PRJ-1035 · All-on-4 Framework",
    last: "Great working with you! Let me know on the next case.",
    time: "Jun 1",
    unread: 0,
    initials: "JT",
  },
];

const THREAD_BY_ID: Record<
  number,
  { from: string; initials: string; time: string; text: string }[]
> = {
  1: [
    {
      from: "Sarah Chen",
      initials: "SC",
      time: "Jun 5, 11:31 AM",
      text: "Hi Dr. Martinez, I've accepted your case. I'll start working on the implant bar now.",
    },
    {
      from: "Dr. Martinez",
      initials: "DM",
      time: "Jun 5, 12:05 PM",
      text: "Hi Sarah! We're using Nobel Biocare MultiUnit 17° — standard platform. Height of gingival tissues is ~3mm.",
    },
    {
      from: "Sarah Chen",
      initials: "SC",
      time: "Jun 5, 12:20 PM",
      text: "Perfect, that's exactly what I needed. I'll have a draft ready by tomorrow morning.",
    },
    {
      from: "Sarah Chen",
      initials: "SC",
      time: "Jun 7, 10:25 AM",
      text: "I've uploaded the first version of the implant bar. Please check the contacts and emergence profile.",
    },
    {
      from: "Sarah Chen",
      initials: "SC",
      time: "10 min ago",
      text: "I've uploaded the revised STL for your review.",
    },
  ],
  2: [
    {
      from: "Elena Rodriguez",
      initials: "ER",
      time: "Jun 6, 09:00 AM",
      text: "Hello Dr. Martinez, I'm working on the crown & bridge case. I have a quick question.",
    },
    {
      from: "Elena Rodriguez",
      initials: "ER",
      time: "1 hr ago",
      text: "Could you clarify the margin on tooth #14? The scan shows some ambiguity near the gingival line.",
    },
  ],
  3: [
    {
      from: "Yuki Tanaka",
      initials: "YT",
      time: "Jun 5, 08:00 AM",
      text: "Hi, I've started on the veneers. The anterior aesthetics will be beautiful with the requested proportions.",
    },
    {
      from: "Dr. Martinez",
      initials: "DM",
      time: "Jun 6, 11:00 AM",
      text: "Yuki, the first version looks good but the incisal edge on #8 is too long by about 0.5mm.",
    },
    {
      from: "Yuki Tanaka",
      initials: "YT",
      time: "3 hrs ago",
      text: "Revision complete — ready for approval.",
    },
  ],
};

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filtered = CONVERSATIONS.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.project.toLowerCase().includes(search.toLowerCase()),
  );

  const active = CONVERSATIONS.find((c) => c.id === activeId);
  const thread = THREAD_BY_ID[activeId] ?? [];

  return (
    <div className="h-[calc(100vh-112px)] flex rounded-xl overflow-hidden border border-border/60 bg-white shadow-sm">
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r border-border/60 flex flex-col">
        <div className="p-4 border-b border-border/60">
          <h2 className="font-semibold text-sm text-foreground mb-3">
            Messages
          </h2>
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 rounded-lg border border-border bg-muted pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={cn(
                "w-full text-left px-4 py-3.5 flex items-start gap-3 border-b border-border/40 transition-colors",
                activeId === c.id
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : "hover:bg-muted/40",
              )}
            >
              <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p
                    className={`text-xs font-semibold truncate ${c.unread ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {c.name}
                  </p>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {c.time}
                  </span>
                </div>
                <p className="text-[10px] text-primary truncate">{c.project}</p>
                <p
                  className={`text-xs mt-0.5 truncate ${c.unread ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {c.last}
                </p>
              </div>
              {c.unread > 0 && (
                <span className="size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Thread header */}
        <div className="px-5 py-3.5 border-b border-border/60 flex items-center gap-3">
          <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
            {active?.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {active?.name}
            </p>
            <p className="text-xs text-primary">{active?.project}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {thread.map((m) => {
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
                  className={`max-w-[70%] flex flex-col gap-1 ${isMe ? "items-end" : ""}`}
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

        {/* Compose */}
        <div className="p-4 border-t border-border/60 flex gap-3 items-end">
          <Button
            variant="ghost"
            size="sm"
            className="size-10 p-0 text-muted-foreground shrink-0"
          >
            <Paperclip size={16} />
          </Button>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="resize-none min-h-[44px] text-foreground max-h-32 text-sm flex-1"
            rows={1}
          />
          <Button size="sm" className="shrink-0 gap-1.5 h-11 px-4">
            <Send size={13} />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
