import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { howl } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function EditSubscription({
  data,
}: {
  data: {
    id: number;
    plan_name: string;
    duration: string;
    price: string;
    discount: number;
    features: Array<string>;
    status: string;
    is_enabled: number;
    created_at: string;
    updated_at: string;
    final_price: string;
  };
}) {
  const [price, setPrice] = React.useState(data?.price);
  const [discount, setDiscount] = React.useState(data?.discount);
  const [duration, setDuration] = React.useState(data?.duration);
  const qcl = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["update_subsc"],
    mutationFn: (updatedData: {
      duration: "7_days" | "monthly" | "3_months" | "6_months" | "12_months";
      price?: string;
      discount?: number;
    }) => {
      return howl(`/admin/edit-subscription/${data.id}?_method=PATCH`, {
        method: "POST",
        body: updatedData,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
  const submitChanges = async () => {
    if (data?.id === 2) {
      mutate({
        duration: duration as
          | "7_days"
          | "monthly"
          | "3_months"
          | "6_months"
          | "12_months",
        price: price,
        discount: discount,
      });
    } else {
      mutate({
        duration: duration as
          | "7_days"
          | "monthly"
          | "3_months"
          | "6_months"
          | "12_months",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EditIcon />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-xl bg-white! text-black!">
        <DialogHeader>
          <DialogTitle>Edit Subscription ({data?.plan_name})</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          <Label>Plan Name</Label>
          <Input
            className="col-span-2 bg-white!"
            defaultValue={data?.plan_name}
            readOnly
          />
          {data?.id === 2 && (
            <>
              <div className="space-y-2">
                <Label>Base Price</Label>
                <Input
                  className="bg-white!"
                  defaultValue={data?.price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Promotional Discount (%)</Label>
                <Input
                  className="bg-white!"
                  defaultValue={data?.discount}
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </div>
            </>
          )}
          <div className="space-y-2 col-span-2">
            <Label>Plan Duration</Label>
            <Select
              defaultValue={data?.duration}
              onValueChange={(value) => setDuration(value)}
            >
              <SelectTrigger className="w-full bg-white! py-5 text-black!">
                <SelectValue placeholder={data?.duration} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7_days">7 days</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="3_months">3 months</SelectItem>
                <SelectItem value="6_months">6 months</SelectItem>
                <SelectItem value="12_months">12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="bg-white border-t-0!">
          <Button
            size="lg"
            className="w-full"
            onClick={submitChanges}
            disabled={isPending}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
