"use client";

import {
  BookOpen,
  CreditCard,
  FileText,
  Globe,
  Save,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const TABS = [
  { key: "general", label: "General", icon: Globe },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "terms", label: "Terms & Conditions", icon: BookOpen },
  { key: "privacypolicy", label: "Privacy Policy", icon: ShieldCheck },
] as const;

type Tab = (typeof TABS)[number]["key"];

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Input({
  defaultValue,
  placeholder,
  type = "text",
  className = "",
}: {
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`h-9 rounded-lg border border-border bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
    />
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Platform Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 divide-y divide-border">
          <SettingRow
            label="Platform Name"
            description="Displayed across the site and emails."
          >
            <Input defaultValue="ExoConnect" className="w-56" />
          </SettingRow>
          <SettingRow
            label="Support Email"
            description="Receives all support inquiries."
          >
            <Input
              defaultValue="support@exoconnect.io"
              type="email"
              className="w-64"
            />
          </SettingRow>
          <SettingRow
            label="Platform URL"
            description="Base URL used in emails and links."
          >
            <Input defaultValue="https://exoconnect.io" className="w-64" />
          </SettingRow>
          <SettingRow
            label="Default Language"
            description="Language for all new user accounts."
          >
            <select className="h-9 rounded-lg border border-border bg-muted px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-40">
              <option>English (US)</option>
              <option>French</option>
              <option>German</option>
              <option>Spanish</option>
            </select>
          </SettingRow>
          <SettingRow
            label="Timezone"
            description="Used for scheduling and billing dates."
          >
            <select className="h-9 rounded-lg border border-border bg-muted px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-48">
              <option>UTC</option>
              <option>America/New_York</option>
              <option>America/Los_Angeles</option>
              <option>Europe/London</option>
            </select>
          </SettingRow>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Platform Features
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {[
            {
              label: "Designer Marketplace",
              description: "Allow dentists to browse and hire designers.",
              on: true,
            },
            {
              label: "Public Designer Profiles",
              description:
                "Show designer profiles publicly on the landing page.",
              on: true,
            },
            {
              label: "Review & Rating System",
              description: "Dentists can rate and review completed projects.",
              on: true,
            },
            {
              label: "In-App Messaging",
              description:
                "Enable real-time chat between dentists and designers.",
              on: true,
            },
            {
              label: "New Designer Registration",
              description:
                "Allow new designers to sign up from the landing page.",
              on: true,
            },
            {
              label: "New Practice Registration",
              description: "Allow new dental practices to register.",
              on: true,
            },
          ].map((s) => (
            <SettingRow
              key={s.label}
              label={s.label}
              description={s.description}
            >
              <SwitchSetting defaultChecked={s.on} />
            </SettingRow>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function SwitchSetting({ defaultChecked }: { defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return <Switch checked={checked} onCheckedChange={setChecked} />;
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Stripe Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 divide-y divide-border">
          <SettingRow
            label="Stripe Mode"
            description="Live mode processes real payments."
          >
            <select className="h-9 rounded-lg border border-border bg-muted px-3 text-sm text-foreground focus:outline-none w-36">
              <option>Live Mode</option>
              <option>Test Mode</option>
            </select>
          </SettingRow>
          <SettingRow
            label="Publishable Key"
            description="Used on the client side."
          >
            <Input
              defaultValue="pk_live_••••••••••••••••4242"
              className="w-72"
            />
          </SettingRow>
          <SettingRow
            label="Secret Key"
            description="Server-side key — never expose publicly."
          >
            <Input
              defaultValue="sk_live_••••••••••••••••••••"
              type="password"
              className="w-72"
            />
          </SettingRow>
          <SettingRow
            label="Webhook Secret"
            description="Validates Stripe webhook events."
          >
            <Input
              defaultValue="whsec_••••••••••••••••••••"
              type="password"
              className="w-72"
            />
          </SettingRow>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Commission & Payouts
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          <SettingRow
            label="Platform Commission Rate"
            description="Percentage taken from each completed order."
          >
            <div className="flex items-center gap-2">
              <Input defaultValue="15" className="w-20 text-center" />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </SettingRow>
          <SettingRow
            label="Payout Schedule"
            description="How often designer earnings are disbursed."
          >
            <select className="h-9 rounded-lg border border-border bg-muted px-3 text-sm text-foreground focus:outline-none w-36">
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </SettingRow>
          <SettingRow
            label="Minimum Payout"
            description="Minimum balance required to trigger a payout."
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">$</span>
              <Input defaultValue="50" className="w-20 text-center" />
            </div>
          </SettingRow>
          <SettingRow
            label="Automatic Payouts"
            description="Automatically disburse on schedule without manual approval."
          >
            <SwitchSetting defaultChecked={true} />
          </SettingRow>
        </CardContent>
      </Card>
    </div>
  );
}

function TermsSettings() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Document</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            defaultValue="Enter your Terms & Conditions text here..."
            rows={14}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          />
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <Button size="lg">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function PrivacyPolicySettings() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Document</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            defaultValue="Enter your Privacy Policy text here..."
            rows={14}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          />
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <Button size="lg">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

const TAB_CONTENT: Record<Tab, React.ReactNode> = {
  general: <GeneralSettings />,
  payments: <PaymentSettings />,
  terms: <TermsSettings />,
  privacypolicy: <PrivacyPolicySettings />,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure platform-wide settings, security, payments, and content.
          </p>
        </div>
        <Button size="sm" className="gap-2 h-9 text-xs">
          <Save size={13} />
          Save Changes
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 shrink-0">
          <nav className="flex flex-col gap-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === t.key
                    ? "bg-primary text-primary-foreground"
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
