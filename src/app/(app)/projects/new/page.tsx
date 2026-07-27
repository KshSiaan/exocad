"use client";

import {
  ArrowLeft,
  CheckCircle,
  Search,
  Star,
  Upload,
  X,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Designers from "./designers";
import Paymentable from "./paymentable";

const DESIGNERS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    rating: 4.9,
    reviews: 127,
    status: "Available",
    specializations: ["Crown & Bridge", "Implants", "Full Arch"],
    price: "$85–$120",
    turnaround: "24–48 hrs",
  },
  {
    id: 2,
    name: "Marcus Weber",
    rating: 4.8,
    reviews: 98,
    status: "Available",
    specializations: ["Crown & Bridge", "Veneers", "Implants"],
    price: "$90–$130",
    turnaround: "36–48 hrs",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    rating: 4.9,
    reviews: 156,
    status: "Available",
    specializations: ["Veneers", "Crown & Bridge", "Full Arch"],
    price: "$80–$115",
    turnaround: "24–36 hrs",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    rating: 4.7,
    reviews: 74,
    status: "Busy",
    specializations: ["Implants", "Full Arch", "Implant Bars"],
    price: "$95–$140",
    turnaround: "48–72 hrs",
  },
];

const SERVICE_TYPES = [
  "Crown & Bridge",
  "Implant Bar",
  "Full Arch / All-on-X",
  "Veneers",
  "Implant Abutment",
  "Removable Partial Denture",
  "Complete Denture",
  "Orthodontic Model",
  "Other",
];
const PRIORITIES = [
  "Standard (48–72 hrs)",
  "Express (24–48 hrs)",
  "Rush (12–24 hrs)",
];
const SOFTWARES = ["exocad", "3Shape", "Dental Wings", "No Preference"];

export default function NewProjectPage() {
  const [selectedDesigner, setSelectedDesigner] = useState<number | null>(null);
  const [designerSearch, setDesignerSearch] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [title, setTitle] = useState("");
  const [caseNotes, setCaseNotes] = useState("");
  const [serviceID, setServiceID] = useState<number | null>(null);
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [servicePrice, setServicePrice] = useState<string | null>(null);

  const { data: designersData } = useQuery({
    queryKey: ["designers"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: Array<{
        id: number;
        full_name: string;
        role: string;
        email: string;
        status: string;
        avatar: any;
        avatar_url: string;
        designer_service: Array<{
          id: number;
          designer_id: number;
          service_id: number;
          custom_price: string;
          note: string;
          created_at: string;
          updated_at: string;
        }>;
        profile?: {
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
        };
      }>;
    }> => {
      return howl(`/get-designers`);
    },
  });

  const filteredDesigners = DESIGNERS.filter(
    (d) =>
      !designerSearch ||
      d.name.toLowerCase().includes(designerSearch.toLowerCase()) ||
      d.specializations.some((s) =>
        s.toLowerCase().includes(designerSearch.toLowerCase()),
      ),
  );

  // if (submitted) {
  //   return (
  //     <div className="mx-auto py-16 text-center space-y-5">
  //       <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
  //         <CheckCircle size={32} />
  //       </div>
  //       <div>
  //         <h2 className="text-2xl font-bold text-foreground">
  //           Project Submitted!
  //         </h2>
  //         <p className="text-muted-foreground mt-2">
  //           Your project has been sent to the designer. You'll be notified once
  //           they accept.
  //         </p>
  //       </div>
  //       <div className="bg-muted/40 rounded-xl p-4 text-sm text-left space-y-2">
  //         <div className="flex justify-between">
  //           <span className="text-muted-foreground">Project ID</span>
  //           <span className="font-mono font-semibold">PRJ-1043</span>
  //         </div>
  //         <div className="flex justify-between">
  //           <span className="text-muted-foreground">Assigned to</span>
  //           <span className="font-semibold">
  //             {selectedDesigner
  //               ? DESIGNERS.find((d) => d.id === selectedDesigner)?.name
  //               : "Auto-assigned"}
  //           </span>
  //         </div>
  //         <div className="flex justify-between">
  //           <span className="text-muted-foreground">Status</span>
  //           <span className="text-amber-600 font-medium">
  //             Pending Acceptance
  //           </span>
  //         </div>
  //       </div>
  //       <div className="flex gap-3 justify-center">
  //         <Button variant="outline" asChild>
  //           <Link href="/projects">View All Projects</Link>
  //         </Button>
  //         <Button asChild>
  //           <Link href="/projects/PRJ-1043">Track Project</Link>
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">New Project</h1>
          <p className="text-sm text-muted-foreground">
            Submit a CAD design request
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-0">
        {(
          [
            "Case Details",
            "Choose Designer",
            "Upload Files",
            "Review",
            "Pay & Submit",
          ] as const
        ).map((s, i) => {
          const stepNum = (i + 1) as 1 | 2 | 3 | 4 | 5;
          const done = step > stepNum;
          const active = step === stepNum;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? "bg-emerald-500 text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {done ? <CheckCircle size={14} /> : stepNum}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s}
                </span>
              </div>
              {i < 4 && <div className="flex-1 h-px bg-border mx-3" />}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label>Project Title</Label>
                <Input
                  placeholder="e.g. Crown & Bridge — Patient #2024"
                  className="h-10"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* <div className="space-y-1.5">
                <Label>Service Type</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="h-10! w-full">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminServices?.data?.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </div>
            <div className="space-y-1.5">
              <Label>Case Notes</Label>
              <Textarea
                placeholder="Describe the case — teeth involved, material, occlusion notes, patient considerations, etc."
                className="min-h-[100px] resize-none"
                value={caseNotes}
                onChange={(e) => setCaseNotes(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!title.trim()}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Choose a Designer</CardTitle>
              {selectedDesigner && (
                <button
                  type="button"
                  onClick={() => setSelectedDesigner(null)}
                  className="text-xs text-destructive hover:text-foreground flex items-center gap-1"
                >
                  <XIcon className="size-4" size={16} /> Clear selection
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={designerSearch}
                onChange={(e) => setDesignerSearch(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-muted pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {filteredDesigners.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No designers match your search.
              </p>
            )}
            <div className="grid grid-cols-3 gap-3">
              {designersData?.data?.map((d) => (
                <Designers
                  key={d.id}
                  d={d}
                  selectedDesigner={selectedDesigner}
                  setSelectedDesigner={setSelectedDesigner}
                  setServiceID={setServiceID}
                  setServiceName={setServiceName}
                  setServicePrice={setServicePrice}
                />
              ))}
            </div>
            {/* <p className="text-xs text-muted-foreground text-center pt-2">
              Or leave unselected and we'll match you automatically.
            </p> */}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}
      {step === 3 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Upload Scan Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className=" rounded-lg p-4 ">
              {selectedFiles && selectedFiles.length > 0 ? (
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
                              prevFiles?.filter((_, i) => i !== index) || null,
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
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}
      {step === 4 && (
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Review Your Project</CardTitle>
            <p className="text-sm text-muted-foreground">
              Review everything carefully before continuing to payment.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Project Details */}
            <div className="rounded-xl border bg-muted/30 p-5">
              <h3 className="font-semibold mb-4">Project Details</h3>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Project Title</p>
                  <p className="font-medium mt-1">{title}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Service</p>
                  <p className="font-medium mt-1">
                    {serviceName ?? "Not selected"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs text-muted-foreground mb-2">Case Notes</p>

                <div className="rounded-lg border bg-background p-4 whitespace-pre-wrap text-sm leading-6">
                  {caseNotes ? (
                    caseNotes
                  ) : (
                    <span className="italic text-muted-foreground">
                      No case notes provided.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Designer */}
            <div className="rounded-xl border bg-muted/30 p-5">
              <h3 className="font-semibold mb-4">Assigned Designer</h3>

              {selectedDesigner ? (
                (() => {
                  const designer = designersData?.data?.find(
                    (d) => d.id === selectedDesigner,
                  );

                  return (
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex gap-4">
                        <Avatar className="size-14">
                          <AvatarImage
                            src={designer?.avatar_url || undefined}
                          />
                          <AvatarFallback>
                            {designer?.full_name
                              ?.split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h4 className="font-semibold text-base">
                            {designer?.full_name}
                          </h4>

                          <p className="text-sm text-muted-foreground">
                            {designer?.profile?.professional_title ||
                              "Dental CAD Designer"}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {designer?.profile?.specializations?.map(
                              (item: string) => (
                                <span
                                  key={item}
                                  className="rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs"
                                >
                                  {item}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            designer?.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {designer?.status}
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                          Service Price
                        </p>

                        <p className="text-xl font-bold">
                          ${servicePrice ?? "--"}
                        </p>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="rounded-lg border border-dashed p-5">
                  <h4 className="font-medium">Automatic Assignment</h4>

                  <p className="text-sm text-muted-foreground mt-1">
                    We'll automatically assign your project to the most suitable
                    available designer.
                  </p>
                </div>
              )}
            </div>

            {/* Files */}
            <div className="rounded-xl border bg-muted/30 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Uploaded Files</h3>

                <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                  {selectedFiles?.length ?? 0}{" "}
                  {(selectedFiles?.length ?? 0) === 1 ? "File" : "Files"}
                </span>
              </div>

              {selectedFiles?.length ? (
                <>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="rounded-lg border bg-background px-4 py-3 flex items-center justify-between"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{file.name}</p>

                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>

                        <CheckCircle className="size-5 text-emerald-500" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                    <span>Total Upload Size</span>

                    <span>
                      {(
                        selectedFiles.reduce((sum, f) => sum + f.size, 0) /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </span>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-dashed bg-background py-10 text-center text-muted-foreground">
                  No files uploaded.
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold mb-4">Pricing Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {serviceName ?? "Service"}
                  </span>

                  <span>${servicePrice ?? "0.00"}</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>

                  <span>${servicePrice ?? "0.00"}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold">Ready to continue?</p>

                <p className="text-sm text-muted-foreground">
                  You'll complete your payment securely in the next step.
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">Amount Due</p>

                <p className="text-2xl font-bold">${servicePrice ?? "0.00"}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>

              <Button className="min-w-[220px]" onClick={() => setStep(5)}>
                Continue to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardContent>
            <Paymentable
              dataset={{
                title,
                caseNotes,
                serviceID,
                serviceName,
                servicePrice,
                selectedDesigner,
                selectedFiles,
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
