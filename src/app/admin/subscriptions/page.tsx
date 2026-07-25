"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/api";
import EditSubscription from "./edit-scubscription";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SubscriptionsPage() {
  const [paidMode, setPaidMode] = useState(true);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        is_trial: boolean;
        subscriptions: Array<{
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
        }>;
      };
    }> => {
      return howl(`/admin/get-subscriptions`);
    },
  });
  const { mutate: toggleTrialMode, isPending: isTogglePending } = useMutation({
    mutationKey: ["paid_unpaid_toggle"],
    mutationFn: () => {
      return howl(`/admin/trial-toggle`, {
        method: "PATCH",
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      refetch();
      toast.success(res.message ?? "Success!");
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Subscriptions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track all designer subscriptions, billing cycles, and MRR.
          </p>
        </div>
        <Badge>PAID MODE</Badge>
      </div>

      <div className="">
        <Card>
          <CardContent className="p-5 flex justify-between items-center">
            <div className="">
              <h3 className="text-lg font-semibold">
                Paid Subscription Active
              </h3>
              <p className="text-xs text-muted-foreground">
                Customers must pay to access this membership tier
              </p>
            </div>
            <div className="">
              <Switch
                checked={data?.data?.is_trial}
                onCheckedChange={() => {
                  toggleTrialMode();
                }}
                disabled={isPending || isTogglePending}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Active Plan Tiers
            </CardTitle>
            {/* <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {["All", "Active", "Past Due", "Cancelled"].map((s, i) => (
                <button
                  key={s}
                  type="button"
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${i === 0 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div> */}
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Plan Type
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Base Price
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Discount
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Final Price
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Validity
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Action
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.subscriptions.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="pl-6">
                  <Badge
                    variant={
                      s?.plan_name === "Free Trial" ? "secondary" : "default"
                    }
                  >
                    {s?.plan_name}
                  </Badge>
                </TableCell>
                <TableCell>${s?.price}</TableCell>
                <TableCell>{s?.discount}%</TableCell>
                <TableCell>${s?.final_price}</TableCell>
                <TableCell>{s?.duration}</TableCell>
                <TableCell>
                  <EditSubscription data={s} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
