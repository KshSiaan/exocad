"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Plus,
  PlusIcon,
  RefreshCw,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/api";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import ServiceActions from "./service-actions";

const PROJECTS = [
  {
    id: "#PRJ-1042",
    practice: "Bright Smiles Dental",
    dentist: "Dr. Michael Lee",
    designer: "Sarah Chen",
    type: "Full Arch Restoration",
    files: 3,
    status: "In Progress",
    due: "Jun 12, 2024",
    amount: "$380",
  },
  {
    id: "#PRJ-1041",
    practice: "Premier Orthodontics",
    dentist: "Dr. James Whitfield",
    designer: "Elena Rodriguez",
    type: "Implant Bar",
    files: 2,
    status: "Review",
    due: "Jun 10, 2024",
    amount: "$290",
  },
  {
    id: "#PRJ-1040",
    practice: "Advanced Periodontics",
    dentist: "Dr. Chris Evans",
    designer: "Marcus Weber",
    type: "Crown Set × 4",
    files: 4,
    status: "Completed",
    due: "Jun 5, 2024",
    amount: "$480",
  },
  {
    id: "#PRJ-1039",
    practice: "City Dental Group",
    dentist: "Dr. Rachel Kim",
    designer: "Yuki Tanaka",
    type: "Veneer Set × 6",
    files: 1,
    status: "Pending",
    due: "Jun 15, 2024",
    amount: "$540",
  },
  {
    id: "#PRJ-1038",
    practice: "Advanced Periodontics",
    dentist: "Dr. Chris Evans",
    designer: "Amara Diallo",
    type: "Overdenture",
    files: 2,
    status: "Revision",
    due: "Jun 8, 2024",
    amount: "$320",
  },
];

const STATUS_CONFIG: Record<string, { className: string }> = {
  "In Progress": {
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  Review: { className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  Completed: {
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  Pending: { className: "bg-muted text-muted-foreground border-border" },
  Revision: {
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
};

const PROJECT_STATUS_ICON: Record<string, React.ReactNode> = {
  "In Progress": <RefreshCw size={11} className="text-blue-500" />,
  Review: <AlertCircle size={11} className="text-amber-500" />,
  Completed: <CheckCircle2 size={11} className="text-emerald-500" />,
  Pending: <Clock size={11} className="text-muted-foreground" />,
  Revision: <RefreshCw size={11} className="text-purple-500" />,
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: Array<{
        id: number;
        name: string;
        min_price: string;
        usage_count: number;
        created_at: string;
        updated_at: string;
      }>;
    }> => {
      return howl(`/admin/get-services`);
    },
  });
  const { mutate: addingService, isPending: isAddingServicePending } =
    useMutation({
      mutationKey: ["add_service"],
      mutationFn: () => {
        return howl(`/admin/add-service`, {
          method: "POST",
          body: {
            name: serviceName,
            min_price: servicePrice,
          },
        });
      },
      onError: (err) => {
        toast.error(err.message ?? "Failed to complete this request");
      },
      onSuccess: (res: any) => {
        refetch();
        toast.success(res.message ?? "Success!");
        setServiceName("");
        setServicePrice("");
      },
    });
  const filtered = PROJECTS.filter(
    (p) =>
      !search ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.practice.toLowerCase().includes(search.toLowerCase()) ||
      p.designer.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor all CAD design projects across the platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 h-9 text-xs">
                <Plus size={13} />
                New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:min-w-xl bg-white! text-black!">
              <DialogHeader>
                <DialogTitle>Add new service</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input
                  className="bg-white! text-black"
                  placeholder="Enter service name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <Label>Service Minimum Price</Label>
                <Input
                  className="bg-white! text-black"
                  placeholder="Enter minimum price"
                  type="number"
                  min={1}
                  value={servicePrice}
                  onChange={(e) => setServicePrice(e.target.value)}
                  required
                />
              </div>
              <Button
                size="lg"
                className="mt-4 w-full"
                onClick={() => addingService()}
                disabled={isAddingServicePending}
              >
                {isAddingServicePending ? <Spinner /> : <PlusIcon />}
                Add Service
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-card border-border px-4">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Service ID
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Service Name
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Service Minimum Price
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((p) => (
              <TableRow
                key={p.id}
                className="border-border hover:bg-muted/40 cursor-pointer"
              >
                <TableCell className="pl-6 text-sm font-mono text-foreground">
                  {p.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {p.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  ${p.min_price}
                </TableCell>
                <TableCell className="space-x-2">
                  <ServiceActions data={p} refetch={refetch} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
