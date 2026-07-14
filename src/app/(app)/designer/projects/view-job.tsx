import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function ViewJob({
  j,
}: {
  j: {
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
    dentist_scan_files: string[];
    designer_submitted_files: any;
    designer_payout_status: any;
    comments: any;
    payment_type: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
  };
}) {
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined,
  );
  return (
    <div className="grid grid-cols-4 gap-4  h-full">
      <div className="col-span-3 bg-muted-foreground/20 rounded-lg relative text-black">
        {selectedFile ? (
          [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".webp",
            ".svg",
            ".bmp",
            ".avif",
          ].some((ext) => selectedFile.toLowerCase().endsWith(ext)) ? (
            <Image
              src={selectedFile}
              fill
              alt={selectedFile.split("/").pop() ?? ""}
            />
          ) : (
            <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
              <p>{selectedFile.split("/").pop() ?? ""}</p>
              <Button asChild>
                <a
                  href={selectedFile}
                  download
                  className="flex items-center gap-2"
                >
                  <DownloadIcon />
                  Download Selected file
                </a>
              </Button>
            </div>
          )
        ) : (
          <div>No File Selected</div>
        )}
      </div>
      <div className="h-full p-4 border-l border-muted-foreground/30 py-2">
        <div className="">
          <h3 className="text-muted font-semibold">Project Files</h3>
          <p className="text-sm text-muted-foreground text-xs">
            Case ID: #{j.id}
          </p>
        </div>
        <div className=" mt-6">
          <div className="text-muted">Images:</div>
          {j.dentist_scan_files?.length > 0 ? (
            <div className="mt-4 space-y-2">
              {j.dentist_scan_files
                .filter((file) => {
                  const ext = file.split(".").pop()?.toLowerCase();
                  return [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                    "svg",
                    "bmp",
                    "avif",
                  ].includes(ext ?? "");
                })
                .map((file, index) => (
                  <Button
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    onClick={() => setSelectedFile(file)}
                    size="lg"
                    variant={selectedFile === file ? "secondary" : "outline"}
                    className="w-full text-sm text-muted-foreground hover:text-foreground"
                  >
                    {file.split("/").pop()}
                  </Button>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No files available.</p>
          )}
        </div>
        <div className="mt-4">
          <div className="text-muted">Others:</div>
          {j.dentist_scan_files?.length > 0 ? (
            <div className="mt-4 space-y-2">
              {j.dentist_scan_files
                .filter((file) => {
                  const ext = file.split(".").pop()?.toLowerCase();
                  return ![
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                    "svg",
                    "bmp",
                    "avif",
                  ].includes(ext ?? "");
                })
                .map((file, index) => (
                  <Button
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    onClick={() => setSelectedFile(file)}
                    size="lg"
                    variant={selectedFile === file ? "secondary" : "outline"}
                    className="w-full text-sm text-muted-foreground hover:text-foreground"
                  >
                    {file.split("/").pop()}
                  </Button>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No files available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
