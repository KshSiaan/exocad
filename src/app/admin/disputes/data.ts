export type DisputeStatus = "Open" | "Resolved" | "Refund Pending" | "Closed";

export interface Dispute {
  id: string;
  uid: string;
  designer: string;
  designerEmail: string;
  dentist: string;
  dentistEmail: string;
  amount: string;
  date: string;
  status: DisputeStatus;
  reason: string;
  reasonTitle: string;
  resolution: string | null;
  files: string[];
}

export const DISPUTES: Dispute[] = [
  {
    id: "ORD-12847",
    uid: "1",
    designer: "Olivia Rhye",
    designerEmail: "olivia.r@email.com",
    dentist: "Emma Wilson",
    dentistEmail: "emma.w@email.com",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Open",
    reasonTitle: "Despute issues",
    reason:
      "The designer failed to follow the specific instructions for the cervical margin on tooth 14 and 15. The digital fit was acceptable but the physical print shows significant gaps.",
    resolution: null,
    files: ["margin_fit_report.pdf", "scan_image_2.png", "scan_image_1.png"],
  },
  {
    id: "ORD-12848",
    uid: "2",
    designer: "Phoenix Baker",
    designerEmail: "phoenix.b@email.com",
    dentist: "Phoenix Baker",
    dentistEmail: "phoenix.b@email.com",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Resolved",
    reasonTitle: "Payment Not Received",
    reason: "Payment not received after project was marked complete by designer.",
    resolution: "Refund issued to dentist after admin review.",
    files: ["invoice_2848.pdf"],
  },
  {
    id: "ORD-12849",
    uid: "3",
    designer: "Lana Steiner",
    designerEmail: "lana.s@email.com",
    dentist: "Lana Steiner",
    dentistEmail: "lana.s@email.com",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Refund Pending",
    reasonTitle: "Spec Changes Mid-Project",
    reason: "Designer claims dentist changed specifications mid-project without formal amendment.",
    resolution: null,
    files: ["spec_doc_v1.pdf", "spec_doc_v2.pdf"],
  },
  {
    id: "ORD-12850",
    uid: "4",
    designer: "Lana Steiner",
    designerEmail: "lana.s@email.com",
    dentist: "Lana Steiner",
    dentistEmail: "lana.s@email.com",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Open",
    reasonTitle: "Dentist Unresponsive",
    reason: "Dentist unresponsive for 10+ days after final delivery was submitted.",
    resolution: null,
    files: [],
  },
  {
    id: "ORD-12851",
    uid: "5",
    designer: "Lana Steiner",
    designerEmail: "lana.s@email.com",
    dentist: "Lana Steiner",
    dentistEmail: "lana.s@email.com",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Closed",
    reasonTitle: "Dispute Withdrawn",
    reason: "Dispute withdrawn by both parties after direct resolution.",
    resolution: "Case closed by admin.",
    files: [],
  },
  {
    id: "ORD-12852",
    uid: "6",
    designer: "Lana Steiner",
    designerEmail: "lana.s@email.com",
    dentist: "Lana Steiner",
    dentistEmail: "lana.s@email.com",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Refund Pending",
    reasonTitle: "Incorrect File Delivered",
    reason: "Incorrect design file delivered — wrong tooth arch exported.",
    resolution: null,
    files: ["wrong_file.stl", "correct_file.stl"],
  },
  {
    id: "ORD-12853",
    uid: "7",
    designer: "Lana Steiner",
    designerEmail: "lana.s@email.com",
    dentist: "Lana Steiner",
    dentistEmail: "lana.s@email.com",
    amount: "$120.00",
    date: "05/04/2024",
    status: "Open",
    reasonTitle: "Quality Below Standard",
    reason: "Dentist claims work quality below agreed standard based on case photos.",
    resolution: null,
    files: ["case_photos.zip"],
  },
];

export const STATUS_STYLES: Record<DisputeStatus, string> = {
  Open: "bg-red-500/10 text-red-600 border-red-500/20",
  Resolved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Refund Pending": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Closed: "bg-muted text-muted-foreground border-border",
};
