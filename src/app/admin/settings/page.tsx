"use client";

import { useState } from "react";
import { BookOpen, Camera, Eye, EyeOff, ShieldCheck, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// ── Shared ────────────────────────────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  id,
  defaultValue,
  placeholder,
  type = "text",
}: {
  id?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full h-10 rounded-lg border border-border bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
    />
  );
}

// ── Password field with show/hide ─────────────────────────────────────────────

function PasswordInput({ id, placeholder }: { id?: string; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full h-10 rounded-lg border border-border bg-muted px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="button"
        onClick={() => setShow((p) => !p)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "terms", label: "Terms & Conditions", icon: BookOpen },
  { key: "privacy", label: "Privacy Policy", icon: ShieldCheck },
] as const;

type Tab = (typeof TABS)[number]["key"];

// ── Profile tab ───────────────────────────────────────────────────────────────

function ProfileSettings() {
  return (
    <div className="space-y-6">
      {/* Avatar + basic info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar row */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                  JD
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 size-7 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors"
              >
                <Camera size={13} />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                John Doe
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Administrator
              </p>
              <button
                type="button"
                className="text-xs text-primary underline underline-offset-2 mt-1 hover:text-primary/80 transition-colors"
              >
                Change photo
              </button>
            </div>
          </div>

          {/* Name + email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First Name" htmlFor="firstName">
              <TextInput id="firstName" defaultValue="John" />
            </Field>
            <Field label="Last Name" htmlFor="lastName">
              <TextInput id="lastName" defaultValue="Doe" />
            </Field>
            <Field label="Email Address" htmlFor="email">
              <TextInput id="email" defaultValue="john.doe@exoconnect.io" type="email" />
            </Field>
            <Field label="Phone Number" htmlFor="phone">
              <TextInput id="phone" defaultValue="+1 (555) 000-0000" />
            </Field>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-border pt-4">
          <Button>Save Profile</Button>
        </CardFooter>
      </Card>

      {/* Change password */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Current Password" htmlFor="currentPassword">
            <PasswordInput id="currentPassword" placeholder="Enter current password" />
          </Field>
          <Field label="New Password" htmlFor="newPassword">
            <PasswordInput id="newPassword" placeholder="Enter new password" />
          </Field>
          <Field label="Confirm New Password" htmlFor="confirmPassword">
            <PasswordInput id="confirmPassword" placeholder="Confirm new password" />
          </Field>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-border pt-4">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// ── Terms tab ─────────────────────────────────────────────────────────────────

function TermsSettings() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Terms & Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          defaultValue="Enter your Terms & Conditions text here..."
          rows={16}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
        />
      </CardContent>
      <CardFooter className="flex justify-end border-t border-border pt-4">
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

// ── Privacy tab ───────────────────────────────────────────────────────────────

function PrivacySettings() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          defaultValue="Enter your Privacy Policy text here..."
          rows={16}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
        />
      </CardContent>
      <CardFooter className="flex justify-end border-t border-border pt-4">
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TAB_CONTENT: Record<Tab, React.ReactNode> = {
  profile: <ProfileSettings />,
  terms: <TermsSettings />,
  privacy: <PrivacySettings />,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your profile, terms, and privacy policy.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-52 shrink-0">
          <nav className="flex flex-col gap-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === t.key
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <t.icon size={15} />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">{TAB_CONTENT[activeTab]}</div>
      </div>
    </div>
  );
}
