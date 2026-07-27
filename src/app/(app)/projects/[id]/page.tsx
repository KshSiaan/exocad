"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  MessageCircle,
  RotateCcw,
  Trash2,
  Triangle,
  Upload,
} from "lucide-react";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { base_url, howl } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const LIFECYCLE = [
  {
    label: "In-Progress",
    time: "Today, 09:15 AM",
    dot: "bg-blue-500",
    text: "text-blue-500",
  },
  {
    label: "Designer Accepted",
    time: "Yesterday, 04:30 PM",
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
  {
    label: "Project Submitted",
    time: "Yesterday, 11:00 AM",
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
];

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [disputeDetails, setDisputeDetails] = useState("");
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [resubmitDetails, setResubmitDetails] = useState("");
  const [resubmitModalOpen, setResubmitModalOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["project"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        id: number;
        project_number: string;
        dentist_id: number;
        project_title: string;
        project_description: string;
        designer_id: number;
        service_name: string;
        service_price: string;
        project_status: string;
        project_status_changed_at: string;
        payment_status: string;
        dentist_scan_files: Array<string>;
        designer_submitted_files: Array<string>;
        designer_payout_status: any;
        comments: any;
        payment_type: string;
        created_at: string;
        updated_at: string;
        deleted_at: any;
        designer: {
          id: number;
          full_name: string;
          email: string;
          role: string;
          status: string;
          avatar_url: string;
        };
        dentist: {
          id: number;
          full_name: string;
          email: string;
          role: string;
          status: string;
          avatar_url: string;
        };
      };
    }> => {
      return howl(`/dentist/view-project/${id}`);
    },
  });
  const { mutate: createDispute, isPending: isCreatingDispute } = useMutation({
    mutationKey: ["dispute_create"],
    mutationFn: () => {
      return howl(`/dentist/dispute-project?project_id=${id}`, {
        method: "PATCH",
        body: {
          comments: disputeDetails,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      setDisputeModalOpen(false);
      setDisputeDetails("");
      refetch();
      toast.success(res.message ?? "Success!");
    },
  });
  const { mutate: createRevision, isPending: isCreatingRevision } = useMutation(
    {
      mutationKey: ["revision_create"],
      mutationFn: () => {
        return howl(`/dentist/send-revision?project_id=${id}`, {
          method: "PATCH",
          body: {
            comments: resubmitDetails,
          },
        });
      },
      onError: (err) => {
        toast.error(err.message ?? "Failed to complete this request");
      },
      onSuccess: (res: any) => {
        setResubmitModalOpen(false);
        setResubmitDetails("");
        refetch();
        toast.success(res.message ?? "Success!");
      },
    },
  );

  const PROJECT = {
    name: data?.data?.service_name || "Service Name",
    title: data?.data?.project_title || "Project Title",
    status: data?.data?.project_status || "N/A",
    designer: {
      name: data?.data?.designer?.full_name || "Unknown Designer",
      role: data?.data?.designer ? "Assigned Designer" : "Unassigned",
      initials: "MW",
    },
  };

  return (
    <div className="-m-6 flex flex-col lg:flex-row lg:overflow-hidden lg:h-[calc(100dvh-70px)]">
      {/* Left panel — Case Files */}
      <div className="w-full lg:w-65 shrink-0 bg-white border-b border-border/60 lg:border-b-0 lg:border-r flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Case Files</h2>
          <Button
            size="sm"
            className="h-8 px-3 text-xs bg-foreground text-background hover:bg-foreground/90"
          >
            Add File
          </Button>
        </div>

        {/* Project card */}
        <div className="px-4 pt-3 pb-3">
          <div className="rounded-xl border border-border/60 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {PROJECT.name}
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
                {PROJECT.designer.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {PROJECT.designer.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {PROJECT.designer.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scan files */}
        <div className="px-4 pb-3 border-t border-border/60 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Your Scan Files
          </p>
          <div className="space-y-2">
            {data?.data?.dentist_scan_files?.map((f, i) => (
              <div
                key={`${f}-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  i
                }`}
                className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className="text-rose-500 shrink-0" />
                  <div>
                    <p className="text-xs line-clamp-2 font-medium text-foreground">
                      {f.split("/").pop()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {/* {f??"n/a"} */}
                    </p>
                  </div>
                </div>
                {/* <button
                  type="button"
                  className="text-rose-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 size={14} />
                </button> */}
              </div>
            ))}
          </div>
        </div>

        {/* Upload zone — compact */}
        {/* <div className="px-4 pb-4">
          <div className="border border-dashed border-border/60 rounded-xl px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-muted/20 transition-colors">
            <div className="size-8 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
              <Upload size={14} className="text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground">
                Click to upload or drag & drop
              </p>
              <p className="text-[10px] text-muted-foreground">
                PNG, JPG, WEBP, STL · max 5MB
              </p>
            </div>
          </div>
        </div> */}

        {/* Designer submitted files */}
        <div className="px-4 pb-5 border-t border-border/60 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Designer Submitted Files
          </p>
          <div className="space-y-2">
            {data?.data?.designer_submitted_files?.map((f, i) => (
              <div
                key={`df-${f}-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  i
                }`}
                className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText size={16} className="text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate line-clamp-2">
                      {f.split("/").pop()}
                    </p>
                    {/* <p className="text-[10px] text-muted-foreground">
                      {f.size} · {f.time}
                    </p> */}
                  </div>
                </div>
                <a
                  href={base_url + f}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-2"
                  download
                >
                  <Download size={13} />
                </a>
              </div>
            ))}
          </div>
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

        {/* Collaboration box */}
        {/*<div className="bg-white border-t border-border/60 flex flex-col">
           <div className="flex items-center gap-2 px-5 py-3 border-b border-border/60">
            <MessageCircle size={15} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              Designer Collaboration Box
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
              placeholder="Type instructions or chat with designer..."
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />
            <Button
              size="sm"
              className="h-8 px-4 text-xs bg-foreground text-background hover:bg-foreground/90"
            >
              Send
            </Button>
          </div>
        </div> */}
      </div>

      {/* Right panel — actions + lifecycle */}
      <div className="w-full lg:w-55 shrink-0 bg-white border-t border-border/60 lg:border-t-0 lg:border-l flex flex-col overflow-y-auto p-4 gap-3">
        <Button className="w-full gap-2 text-xs! bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
          <CheckCircle2 size={15} />
          Accept Design <br /> & Complete
        </Button>

        <div className="grid grid-cols-1 gap-2">
          {["resubmitted", "submitted"].includes(
            data?.data?.project_status ?? "",
          ) && (
            <Dialog
              open={resubmitModalOpen}
              onOpenChange={setResubmitModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 text-[11px] h-8 px-2"
                >
                  <RotateCcw size={11} />
                  Send Revision
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Revision</DialogTitle>
                </DialogHeader>
                <div className="">
                  <Textarea
                    placeholder="Enter revision details..."
                    value={resubmitDetails}
                    onChange={(e) => setResubmitDetails(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    size="lg"
                    onClick={() => createRevision()}
                    disabled={isCreatingRevision}
                  >
                    Submit Revision
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {["in_progress", "submitted", "revision", "resubmitted"].includes(
            data?.data?.project_status ?? "",
          ) && (
            <Dialog open={disputeModalOpen} onOpenChange={setDisputeModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 text-[11px] h-8 px-2 border-amber-400! text-amber-600! hover:bg-amber-50!"
                >
                  <AlertTriangle size={11} />
                  Dispute Case
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dispute Case</DialogTitle>
                </DialogHeader>
                <div className="">
                  <Textarea
                    placeholder="Enter dispute details..."
                    value={disputeDetails}
                    onChange={(e) => setDisputeDetails(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    size="lg"
                    onClick={() => createDispute()}
                    disabled={isCreatingDispute}
                  >
                    Submit Dispute
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
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
