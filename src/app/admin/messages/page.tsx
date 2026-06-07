"use client";

import { MessageSquare, Search, Send, Users } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const CONVERSATIONS = [
  {
    id: "conv-001",
    name: "Dr. Michael Lee",
    role: "Dentist",
    practice: "Bright Smiles Dental",
    initials: "ML",
    lastMessage: "I've uploaded the revised STL file. Please review.",
    lastTime: "2 min ago",
    unread: 3,
  },
  {
    id: "conv-002",
    name: "Sarah Chen",
    role: "Designer",
    practice: "",
    initials: "SC",
    lastMessage: "Can you clarify the margin on tooth #14?",
    lastTime: "18 min ago",
    unread: 1,
  },
  {
    id: "conv-003",
    name: "Dr. Rachel Kim",
    role: "Dentist",
    practice: "City Dental Group",
    initials: "RK",
    lastMessage: "Thank you for the quick resolution!",
    lastTime: "1 hr ago",
    unread: 0,
  },
  {
    id: "conv-004",
    name: "Marcus Weber",
    role: "Designer",
    practice: "",
    initials: "MW",
    lastMessage: "I have a question about my payout.",
    lastTime: "3 hr ago",
    unread: 2,
  },
  {
    id: "conv-005",
    name: "Dr. Priya Sharma",
    role: "Dentist",
    practice: "Family Dental Care",
    initials: "PS",
    lastMessage: "All good, thanks for your help.",
    lastTime: "Yesterday",
    unread: 0,
  },
  {
    id: "conv-006",
    name: "Elena Rodriguez",
    role: "Designer",
    practice: "",
    initials: "ER",
    lastMessage: "When will the payout be processed?",
    lastTime: "Yesterday",
    unread: 0,
  },
];

const THREADS: Record<
  string,
  {
    from: string;
    initials: string;
    isAdmin: boolean;
    time: string;
    text: string;
  }[]
> = {
  "conv-001": [
    {
      from: "Dr. Michael Lee",
      initials: "ML",
      isAdmin: false,
      time: "Jun 4, 09:12",
      text: "Hi, I have an issue with project PRJ-1042. The designer hasn't responded in 3 days.",
    },
    {
      from: "Admin",
      initials: "AD",
      isAdmin: true,
      time: "Jun 4, 09:45",
      text: "Thanks for reaching out. I'll look into this right away and follow up with the designer.",
    },
    {
      from: "Dr. Michael Lee",
      initials: "ML",
      isAdmin: false,
      time: "Jun 4, 10:01",
      text: "I've uploaded the revised STL file. Please review.",
    },
  ],
  "conv-002": [
    {
      from: "Sarah Chen",
      initials: "SC",
      isAdmin: false,
      time: "Jun 5, 11:00",
      text: "Hello, I need help with a billing issue. I was charged twice for the same month.",
    },
    {
      from: "Admin",
      initials: "AD",
      isAdmin: true,
      time: "Jun 5, 11:20",
      text: "Hi Sarah, I can see the duplicate charge. I've initiated a refund — it should appear within 3–5 business days.",
    },
    {
      from: "Sarah Chen",
      initials: "SC",
      isAdmin: false,
      time: "Jun 5, 11:35",
      text: "Can you clarify the margin on tooth #14?",
    },
  ],
  "conv-003": [
    {
      from: "Dr. Rachel Kim",
      initials: "RK",
      isAdmin: false,
      time: "Jun 3, 14:00",
      text: "I had a dispute with a designer over file quality.",
    },
    {
      from: "Admin",
      initials: "AD",
      isAdmin: true,
      time: "Jun 3, 14:30",
      text: "I've reviewed the files and agree the quality was below standard. A full refund has been issued.",
    },
    {
      from: "Dr. Rachel Kim",
      initials: "RK",
      isAdmin: false,
      time: "Jun 3, 15:00",
      text: "Thank you for the quick resolution!",
    },
  ],
  "conv-004": [
    {
      from: "Marcus Weber",
      initials: "MW",
      isAdmin: false,
      time: "Jun 6, 08:00",
      text: "I have a question about my payout. It's been 7 days and nothing received.",
    },
    {
      from: "Admin",
      initials: "AD",
      isAdmin: true,
      time: "Jun 6, 08:30",
      text: "Hi Marcus, I'm checking with our finance team. I'll update you within 24 hours.",
    },
  ],
  "conv-005": [
    {
      from: "Dr. Priya Sharma",
      initials: "PS",
      isAdmin: false,
      time: "Jun 1, 10:00",
      text: "Can I change my registered email address?",
    },
    {
      from: "Admin",
      initials: "AD",
      isAdmin: true,
      time: "Jun 1, 10:15",
      text: "Yes, I've updated your email. You'll receive a confirmation shortly.",
    },
    {
      from: "Dr. Priya Sharma",
      initials: "PS",
      isAdmin: false,
      time: "Jun 1, 10:20",
      text: "All good, thanks for your help.",
    },
  ],
  "conv-006": [
    {
      from: "Elena Rodriguez",
      initials: "ER",
      isAdmin: false,
      time: "Jun 2, 16:00",
      text: "When will the payout be processed? I submitted 10 days ago.",
    },
    {
      from: "Admin",
      initials: "AD",
      isAdmin: true,
      time: "Jun 2, 16:30",
      text: "Payouts process every Monday. Yours is scheduled for this coming Monday. Apologies for the delay.",
    },
  ],
};

const STATS = [
  {
    label: "Open Conversations",
    value: "18",
    icon: MessageSquare,
    color: "text-blue-500 bg-blue-50",
  },
  {
    label: "Total Users",
    value: "1,240",
    icon: Users,
    color: "text-emerald-500 bg-emerald-50",
  },
];

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(CONVERSATIONS[0]);
  const [input, setInput] = useState("");
  const [threads, setThreads] = useState(THREADS);

  const filtered = CONVERSATIONS.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()),
  );

  const thread = threads[selected.id] ?? [];

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setThreads((prev) => ({
      ...prev,
      [selected.id]: [
        ...(prev[selected.id] ?? []),
        {
          from: "Admin",
          initials: "AD",
          isAdmin: true,
          time: "Just now",
          text,
        },
      ],
    }));
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Messages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Direct conversations with dentists and designers.
          </p>
        </div>
      </div>

      {/* Chat panel */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 h-[calc(100vh-200px)]">
        {/* Conversation list */}
        <Card className="xl:col-span-2 bg-card border-border shadow-sm flex flex-col overflow-hidden">
          <CardHeader className="pb-3 border-b border-border shrink-0">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search by name or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </CardHeader>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c)}
                className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors ${selected.id === c.id ? "bg-primary/5 border-l-2 border-primary" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-9 shrink-0">
                    <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                      {c.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {c.name}
                      </p>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {c.lastTime}
                      </span>
                    </div>
                    <p className="text-[10px] text-primary font-medium">
                      {c.role}
                      {c.practice ? ` · ${c.practice}` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {c.lastMessage}
                    </p>
                  </div>
                  {c.unread > 0 && (
                    <span className="size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
                      {c.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat thread */}
        <Card className="xl:col-span-3 bg-card border-border shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border flex items-center gap-3 shrink-0">
            <Avatar className="size-9">
              <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                {selected.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {selected.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {selected.role}
                {selected.practice ? ` · ${selected.practice}` : ""}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {thread.map((m) => (
              <div
                key={`${m.from}-${m.time}`}
                className={`flex items-end gap-2 ${m.isAdmin ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="size-7 shrink-0">
                  <AvatarFallback
                    className={`text-[10px] font-bold ${m.isAdmin ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[75%] ${m.isAdmin ? "items-end" : ""} flex flex-col gap-1`}
                >
                  <p
                    className={`text-[10px] text-muted-foreground ${m.isAdmin ? "text-right" : ""}`}
                  >
                    {m.from} · {m.time}
                  </p>
                  <div
                    className={`px-4 py-2.5 rounded-xl text-sm text-foreground shadow-sm ${m.isAdmin ? "bg-primary/10 border border-primary/20 rounded-br-sm" : "bg-white border border-border rounded-bl-sm"}`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compose */}
          <div className="px-5 py-3 border-t border-border bg-card shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message ${selected.name}...`}
                className="flex-1 h-9 rounded-lg border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button
                size="sm"
                className="h-9 gap-1.5 px-4"
                onClick={sendMessage}
              >
                <Send size={13} />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
