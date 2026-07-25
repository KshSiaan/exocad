"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { howl } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ServiceActions({
  data,
  refetch,
}: {
  data: {
    id: number;
    name: string;
    min_price: string;
    usage_count: number;
    created_at: string;
    updated_at: string;
  };
  refetch: () => void;
}) {
  const [serviceName, setServiceName] = React.useState(data?.name);
  const [servicePrice, setServicePrice] = React.useState(data?.min_price);
  const { mutate: updateService, isPending: isUpdatePending } = useMutation({
    mutationKey: ["update_service"],
    mutationFn: () => {
      return howl(`/admin/edit-service/${data?.id}?_method=PATCH`, {
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
      toast.success(res.message ?? "Success!");
      refetch();
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon">
            <EditIcon />
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
            onClick={() => updateService()}
            disabled={isUpdatePending}
          >
            {isUpdatePending && <Spinner />}
            Update Service
          </Button>
        </DialogContent>
      </Dialog>
      <Button size="icon" variant="destructive">
        <Trash2Icon />
      </Button>
    </>
  );
}
