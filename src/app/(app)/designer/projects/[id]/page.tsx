"use client";

import {
  CheckCircle,
  ClockIcon,
  Download,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery } from "@tanstack/react-query";
import { base_api, base_url, howl } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useCookies } from "react-cookie";

const PROJECT = {
  id: "PRJ-1042",
  title: "UPPER CROWN ALIGNMENT",
  status: "In Progress",
  practice: {
    name: "Bright Smiles Dental",
    location: "New York, NY",
    initials: "BS",
  },
};

const LIFECYCLE = [
  {
    label: "Work In Progress",
    time: "Today, 09:15 AM",
    dot: "bg-blue-500",
    text: "text-blue-500",
  },
  {
    label: "Job Accepted",
    time: "Yesterday, 04:30 PM",
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
  {
    label: "Job Received",
    time: "Yesterday, 11:00 AM",
    dot: "bg-emerald-500",
    text: "text-emerald-500",
  },
];

export default function DesignerProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>([]);
  const [{ token }] = useCookies(["token"]);
  const { data, refetch } = useQuery({
    queryKey: ["designer-project-detail", id],
    queryFn: (): Promise<{
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
      };
    }> => {
      return howl(`/designer/view-job/${id}`);
    },
  });
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["submit-job"],
    mutationFn: async () => {
      const formData = new FormData();
      selectedFiles?.forEach((file) => {
        if (!file) {
          throw new Error("No file selected");
        }
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append(
            `designer_submitted_files[${selectedFiles?.indexOf(file)}]`,
            file,
          );
        }
        formData.append("job_id", id);
      });

      const res = await fetch(`${base_url}${base_api}/designer/submit-job`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      toast.success(res.message ?? "Success!");
      refetch();
    },
  });

  const practiceData = [
    { title: "Project ID", value: data?.data?.project_number },
    { title: "Practice Name", value: PROJECT.practice.name },
    // { title: "Location", value: PROJECT.practice.location },
    { title: "Project Status", value: data?.data?.project_status },
  ];

  return (
    <div className="overflow-hidden lg:h-[calc(100dvh-124px)] grid grid-cols-4 gap-6">
      <div className="col-span-3 space-y-6">
        <h2 className="text-lg font-semibold mb-2 text-foreground">
          Full Arch Implant Bar — Patient #{data?.data?.project_number}
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Received Files (from dentist)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data?.data?.dentist_scan_files?.map((file) => (
              <Card key={`${file}`} className="mb-2">
                <CardContent className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge>
                      {file.split("/").pop()?.split(".").pop()?.toUpperCase() ||
                        "FILE"}
                    </Badge>
                    <div className="">
                      <p className="font-medium">{file.split("/").pop()}</p>
                      {/* <p className="text-xs text-muted-foreground">
                        32.1 MB · Jun 5, 09:15 AM
                      </p> */}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="gap-2" asChild>
                    <a href={`${base_url}${file}`} download>
                      <Download size={14} />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Your Uploaded Files</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                {data?.data?.project_status === "in_progress" && (
                  <Button variant="outline" size="sm">
                    <UploadIcon /> Upload File
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>
                <div className=" rounded-lg p-4 ">
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CheckCircle className="size-18" />
                      <h4>Files uploaded successfully!</h4>
                    </div>
                  ) : isPending ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Spinner className="size-18" />
                      <h4>Uploading files...</h4>
                    </div>
                  ) : selectedFiles && selectedFiles.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <li
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          key={index}
                          className="flex items-center gap-2 justify-between"
                        >
                          <span className="text-xs line-clamp-1 text-muted-foreground">
                            {file.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedFiles(
                                (prevFiles) =>
                                  prevFiles?.filter((_, i) => i !== index) ||
                                  null,
                              );
                            }}
                          >
                            <XIcon />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Input
                      type="file"
                      className="w-full"
                      multiple
                      onChange={(e) =>
                        setSelectedFiles(Array.from(e.target.files || []))
                      }
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      if (!selectedFiles || selectedFiles.length === 0) {
                        toast.error(
                          "Please select at least one file to upload.",
                        );
                        return;
                      }
                      mutate();
                    }}
                    disabled={
                      isPending || selectedFiles?.length === 0 || isSuccess
                    }
                  >
                    {isPending ? "Submitting..." : "Submit Files"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {data?.data?.designer_submitted_files?.length === 0 ||
            !data?.data?.designer_submitted_files ? (
              <p className="text-sm text-muted-foreground">
                No files uploaded yet.
              </p>
            ) : (
              data?.data?.designer_submitted_files?.map((file) => (
                <Card key={file} className="mb-2">
                  <CardContent className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge>
                        {file
                          .split("/")
                          .pop()
                          ?.split(".")
                          .pop()
                          ?.toUpperCase() || "FILE"}
                      </Badge>
                      <div className="">
                        <p className="font-medium">{file.split("/").pop()}</p>
                        {/* <p className="text-xs text-muted-foreground">
                          32.1 MB · Jun 5, 09:15 AM
                        </p> */}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="gap-2"
                      asChild
                    >
                      <a href={`${base_url}${file}`} download>
                        <Download size={14} />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-rows-3 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <div className="px-4 space-y-2">
            {practiceData.map((item) => (
              <div className="flex justify-between" key={item.title}>
                <span className="font-semibold text-muted-foreground/60">
                  {item.title}
                </span>
                <span className="text-foreground font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
            {/* <Separator /> */}
            {/* <CardTitle className="text-sm font-semibold">Case Notes</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Patient is fully edentulous maxillary arch. All-on-6 protocol.
              Titanium bar preferred. Milled output — please optimize for
              CADCAM. Contact any prior to finalization. Nobel Biocare MultiUnit
              17°, standard platform, gingival height ~3mm.
            </CardDescription> */}
          </div>
        </Card>
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="size-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
