"use client";

import {
  Camera,
  Eye,
  Globe,
  Lock,
  MapPin,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "profile", label: "Public Profile", icon: Globe },
  { id: "security", label: "Security", icon: Lock },
];

type Service = { id: string; name: string; price: string };

export default function DesignerProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");

  // Basic info
  const [title, setTitle] = useState("Senior Dental CAD Designer");
  const [bio, setBio] = useState(
    "I specialize in high-precision Crown & Bridge, implant-supported restorations, and full-arch cases. With 8+ years in dental CAD design using exocad and 3Shape, I deliver anatomically accurate STL files optimized for milling and 3D printing.",
  );

  // Specializations
  const [specs, setSpecs] = useState(["Clear Aligner", "Crown & Bridge"]);
  const [specInput, setSpecInput] = useState("");

  const addSpec = () => {
    const trimmed = specInput.trim();
    if (trimmed && !specs.includes(trimmed)) {
      setSpecs((prev) => [...prev, trimmed]);
    }
    setSpecInput("");
  };

  // Services & Pricing
  const [services, setServices] = useState<Service[]>([
    { id: "1", name: "Surgical Guide", price: "45.00" },
    { id: "2", name: "Crown & Bridge", price: "85.00" },
  ]);
  const [newSvc, setNewSvc] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVals, setEditVals] = useState({ name: "", price: "" });

  const addService = () => {
    const name = newSvc.name.trim();
    const price = parseFloat(newSvc.price);
    if (!name || Number.isNaN(price) || price < 0) return;
    setServices((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        price: price.toFixed(2),
      },
    ]);
    setNewSvc({ name: "", price: "" });
  };

  const startEdit = (svc: Service) => {
    setEditingId(svc.id);
    setEditVals({ name: svc.name, price: svc.price });
  };

  const saveEdit = (id: string) => {
    const name = editVals.name.trim();
    const price = parseFloat(editVals.price);
    if (!name || Number.isNaN(price) || price < 0) return;
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, name, price: price.toFixed(2) } : s,
      ),
    );
    setEditingId(null);
  };

  const deleteService = (id: string) =>
    setServices((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your public profile and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="bg-white border-border/60 shadow-sm lg:col-span-1 h-fit">
          <CardContent className="p-3">
            <div className="flex flex-col items-center gap-3 py-4 px-2">
              <div className="relative">
                <div className="size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  SC
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 size-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center"
                >
                  <Camera size={11} />
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  Sarah Chen
                </p>
                <div className="flex items-center gap-1 justify-center mt-0.5">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">
                    4.9 · 127 reviews
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            <nav className="space-y-0.5">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeSection === s.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  <s.icon size={15} />
                  {s.label}
                </button>
              ))}
            </nav>
            <Separator className="my-2" />
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs h-8 gap-1.5"
              asChild
            >
              <a href="/designers/1" target="_blank" rel="noopener noreferrer">
                <Eye size={12} />
                Preview Profile
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === "profile" && (
            <div className="space-y-5">
              {/* Basic Profile Info */}
              <Card className="bg-white border-border/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">
                    Basic Profile Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>First Name</Label>
                      <Input defaultValue="Sarah" className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Last Name</Label>
                      <Input defaultValue="Chen" className="h-10" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        defaultValue="New York, USA"
                        className="pl-10 h-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Professional Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Expert Dental Aligner Designer"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Biography / About Me</Label>
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Describe your experience, software skills, and workflow..."
                      className="resize-none min-h-[110px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Specializations */}
              <Card className="bg-white border-border/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Specializations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={specInput}
                      onChange={(e) => setSpecInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSpec()}
                      placeholder="e.g., Crown & Bridge, Clear Aligner"
                      className="h-10 flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addSpec}
                      disabled={!specInput.trim()}
                      className="h-10 px-5 shrink-0"
                    >
                      <Plus size={14} className="mr-1.5" />
                      Add
                    </Button>
                  </div>
                  {specs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {specs.map((s) => (
                        <span
                          key={s}
                          className="flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() =>
                              setSpecs((prev) => prev.filter((x) => x !== s))
                            }
                            className="text-primary/60 hover:text-primary transition-colors"
                            aria-label={`Remove ${s}`}
                          >
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {specs.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No specializations added yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Services & Pricing */}
              <Card className="bg-white border-border/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">
                    My Services &amp; Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add service row */}
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                    <div className="grid grid-cols-[1fr_160px_auto] gap-3 items-end">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Service Name</Label>
                        <Input
                          value={newSvc.name}
                          onChange={(e) =>
                            setNewSvc((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="e.g., Night Guard Design"
                          className="h-10 bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Price ($)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={newSvc.price}
                            onChange={(e) =>
                              setNewSvc((prev) => ({
                                ...prev,
                                price: e.target.value,
                              }))
                            }
                            placeholder="0.00"
                            className="h-10 pl-7 bg-white"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={addService}
                        disabled={!newSvc.name.trim() || !newSvc.price}
                        className="h-10 px-4 text-sm shrink-0"
                      >
                        Add Service
                      </Button>
                    </div>
                  </div>

                  {/* Service list */}
                  {services.length > 0 ? (
                    <div className="rounded-xl border border-border/60 overflow-hidden divide-y divide-border/60">
                      {services.map((svc) =>
                        editingId === svc.id ? (
                          /* Inline edit row */
                          <div
                            key={svc.id}
                            className="grid grid-cols-[1fr_160px_auto] gap-3 items-center px-4 py-3 bg-muted/20"
                          >
                            <Input
                              value={editVals.name}
                              onChange={(e) =>
                                setEditVals((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              className="h-9 text-sm"
                              autoFocus
                            />
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                $
                              </span>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={editVals.price}
                                onChange={(e) =>
                                  setEditVals((prev) => ({
                                    ...prev,
                                    price: e.target.value,
                                  }))
                                }
                                className="h-9 pl-7 text-sm"
                              />
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <Button
                                size="sm"
                                className="h-8 px-3 text-xs"
                                onClick={() => saveEdit(svc.id)}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 px-3 text-xs text-muted-foreground"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          /* Display row */
                          <div
                            key={svc.id}
                            className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/20 transition-colors"
                          >
                            <p className="text-sm font-semibold text-foreground">
                              {svc.name}
                            </p>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                              <span className="text-sm font-bold text-emerald-600">
                                ${svc.price}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-3 text-xs gap-1"
                                onClick={() => startEdit(svc)}
                              >
                                <Pencil size={11} />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-3 text-xs gap-1 text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => deleteService(svc.id)}
                              >
                                <Trash2 size={11} />
                                Delete
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-6">
                      No services added yet. Add your first service above.
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="px-6">Save Settings</Button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <Card className="bg-white border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    placeholder="Min 8 characters"
                    className="h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10"
                  />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
