import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { howl } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export default function ActionJobReq({
  id,
  refetch,
}: {
  id: number;
  refetch: () => void;
}) {
  const { mutate: acceptJob, isPending: isAcceptingJob } = useMutation({
    mutationKey: ["accept_job"],
    mutationFn: (id: number) => {
      return howl(`/designer/accept-job?job_id=${id}`, {
        method: "PATCH",
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
  const { mutate: rejectJob, isPending: isRejectingJob } = useMutation({
    mutationKey: ["reject_job"],
    mutationFn: (id: number) => {
      return howl(`/designer/reject-job?project_id=${id}`, {
        method: "PATCH",
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-3 text-xs text-red-500 border-red-200 hover:bg-red-50"
          >
            Decline
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDescription>
              This action cannot be undone. This will decline the job request.
            </AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                size="sm"
                className="h-7 px-3 text-xs"
                onClick={() => rejectJob(id)}
                disabled={isRejectingJob}
              >
                {isRejectingJob ? "Declining..." : "Decline"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        size="sm"
        className="h-7 px-3 text-xs"
        onClick={() => acceptJob(id)}
        disabled={isAcceptingJob}
      >
        {isAcceptingJob ? "Accepting..." : "Accept"}
      </Button>
    </>
  );
}
