import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import React from "react";

export default function Designers({
  d,
  selectedDesigner,
  setSelectedDesigner,
  setServiceID,
  setServiceName,
  setServicePrice,
}: {
  d: {
    id: number;
    full_name: string;
    role: string;
    email: string;
    status: string;
    avatar: any;
    avatar_url: string;
    designer_service: {
      id: number;
      designer_id: number;
      service_id: number;
      custom_price: string;
      note: string;
      created_at: string;
      updated_at: string;
    }[];
    profile?:
      | {
          id: number;
          user_id: number;
          professional_title: any;
          specializations: any;
          availability: boolean;
          address: any;
          phone_number: any;
          level: any;
          bio: any;
          contact_email_address: any;
        }
      | undefined;
  };
  selectedDesigner: number | null;
  setSelectedDesigner: (id: number) => void;
  setServiceID: (id: number) => void;
  setServiceName: (name: string) => void;
  setServicePrice: (price: string) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`w-full text-left rounded-xl border p-4 transition-all ${
            d.status !== "Active"
              ? "opacity-50 cursor-not-allowed border-border/40"
              : selectedDesigner === d.id
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border/60 hover:border-primary/40 hover:bg-muted/40"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
              {d.full_name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-foreground">
                  {d.full_name}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${d.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground"}`}
                >
                  {d.status}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-foreground">
                  {d.profile?.level || "Level 1"}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({d.profile?.bio ? d.profile.bio.split(" ").length : 0} words)
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {d.profile?.specializations?.slice(0, 3).map((s: any) => (
                  <span
                    key={s}
                    className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-foreground">
                ${d.designer_service?.[0]?.custom_price || "N/A"}
              </p>
              {/* <p className="text-xs text-muted-foreground">
                        {d.turnaround}ss
                      </p> */}
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {d.full_name}{" "}
            {d.profile?.professional_title
              ? `- ${d.profile.professional_title}`
              : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="">
          {d?.designer_service?.map((service) => (
            <Button
              key={service.id}
              size="lg"
              className="w-full"
              onClick={() => {
                setSelectedDesigner(d.id);
                setServiceID(service.id);
                setServiceName(service.note);
                setServicePrice(service.custom_price);
                setIsDialogOpen(false);
              }}
            >
              {service.note} - ${service.custom_price}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
