"use client";

import { Download, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MONTHLY_DATA = [
  { month: "Jan", gross: 1840, net: 1564, jobs: 18 },
  { month: "Feb", gross: 2100, net: 1785, jobs: 21 },
  { month: "Mar", gross: 1980, net: 1683, jobs: 19 },
  { month: "Apr", gross: 2360, net: 2006, jobs: 24 },
  { month: "May", gross: 2406, net: 2045, jobs: 23 },
  { month: "Jun", gross: 2840, net: 2414, jobs: 27 },
];

const TRANSACTIONS = [
  {
    id: "PAY-0847",
    project: "PRJ-1040",
    title: "Partial Denture Lower",
    practice: "Oral Care Center",
    gross: 75,
    commission: 11.25,
    net: 63.75,
    date: "Jun 4, 2024",
    status: "Paid",
  },
  {
    id: "PAY-0846",
    project: "PRJ-1039",
    title: "Anterior Veneers ×6",
    practice: "Bright Smiles Dental",
    gross: 110,
    commission: 16.5,
    net: 93.5,
    date: "Jun 3, 2024",
    status: "Paid",
  },
  {
    id: "PAY-0845",
    project: "PRJ-1036",
    title: "Full Arch Scan Review",
    practice: "Oral Care Center",
    gross: 65,
    commission: 9.75,
    net: 55.25,
    date: "Jun 1, 2024",
    status: "Paid",
  },
  {
    id: "PAY-0844",
    project: "PRJ-1035",
    title: "All-on-4 Framework",
    practice: "Bright Smiles Dental",
    gross: 185,
    commission: 27.75,
    net: 157.25,
    date: "May 28, 2024",
    status: "Paid",
  },
  {
    id: "PAY-0843",
    project: "PRJ-1033",
    title: "Crown & Bridge ×4",
    practice: "Premier Orthodontics",
    gross: 95,
    commission: 14.25,
    net: 80.75,
    date: "May 25, 2024",
    status: "Paid",
  },
  {
    id: "PAY-0842",
    project: "PRJ-1031",
    title: "Implant Abutment ×3",
    practice: "City Dental Group",
    gross: 130,
    commission: 19.5,
    net: 110.5,
    date: "May 22, 2024",
    status: "Paid",
  },
  {
    id: "PAY-0848",
    project: "PRJ-1042",
    title: "Full Arch Implant Bar",
    practice: "Bright Smiles Dental",
    gross: 145,
    commission: 21.75,
    net: 123.25,
    date: "Jun 9, 2024 (est.)",
    status: "Pending",
  },
  {
    id: "PAY-0849",
    project: "PRJ-1046",
    title: "Implant Abutment ×2",
    practice: "City Dental Group",
    gross: 110,
    commission: 16.5,
    net: 93.5,
    date: "Jun 8, 2024 (est.)",
    status: "Pending",
  },
];

const TABS = ["All", "Paid", "Pending"];

export default function DesignerEarningsPage() {
  const [tab, setTab] = useState("All");

  const filtered = TRANSACTIONS.filter(
    (t) => tab === "All" || t.status === tab,
  );
  const totalGross = MONTHLY_DATA.reduce((s, m) => s + m.gross, 0);
  const totalNet = MONTHLY_DATA.reduce((s, m) => s + m.net, 0);
  const pendingAmount = TRANSACTIONS.filter(
    (t) => t.status === "Pending",
  ).reduce((s, t) => s + t.net, 0);

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track your income, commissions, and payouts.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 h-9 text-xs">
          <Download size={13} />
          Export
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "This Month (Gross)",
            value: "$2,840",
            change: "+18%",
            note: "before platform fee",
          },
          {
            label: "This Month (Net)",
            value: "$2,414",
            change: "+18%",
            note: "after 15% fee",
          },
          {
            label: "Pending Payout",
            value: `$${pendingAmount.toFixed(2)}`,
            change: "",
            note: "2 jobs",
          },
          {
            label: "YTD Net Earnings",
            value: `$${totalNet.toLocaleString()}`,
            change: "",
            note: "6 months",
          },
        ].map((k) => (
          <Card key={k.label} className="bg-white border-border/60 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{k.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {k.value}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {k.change && (
                  <span className="text-xs text-emerald-500 flex items-center gap-0.5">
                    <TrendingUp size={10} />
                    {k.change}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">{k.note}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Earnings chart */}
      <Card className="bg-white border-border/60 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Monthly Earnings
            </CardTitle>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-primary inline-block" />
                Gross
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-400 inline-block" />
                Net
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: 12,
                  color: "#111827",
                }}
                formatter={(v, name) => [
                  `$${v ?? 0}`,
                  name === "gross" ? "Gross" : "Net",
                ]}
              />
              <Area
                type="monotone"
                dataKey="gross"
                stroke="#0d9488"
                strokeWidth={2}
                fill="url(#grossGrad)"
              />
              <Area
                type="monotone"
                dataKey="net"
                stroke="#34d399"
                strokeWidth={2}
                fill="url(#netGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payout info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Payout Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bank</span>
              <span className="font-medium">Chase •••• 8821</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Schedule</span>
              <span className="font-medium">Every 2 weeks</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next Payout</span>
              <span className="font-medium text-emerald-600">Jun 15, 2024</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs mt-1"
            >
              Request Early Payout
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Platform Fee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Commission Rate</span>
              <span className="font-bold text-foreground">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">YTD Gross</span>
              <span className="font-medium">
                ${totalGross.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">YTD Fees Paid</span>
              <span className="font-medium">
                ${(totalGross - totalNet).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">YTD Net</span>
              <span className="font-bold text-emerald-600">
                ${totalNet.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction log */}
      <Card className="bg-white border-border/60 shadow-sm">
        <div className="p-4 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === t
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {filtered.length} transactions
          </span>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              {[
                "Date",
                "Project",
                "Practice",
                "Gross",
                "Fee (15%)",
                "Net",
                "Status",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wide first:pl-6"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t) => (
              <TableRow
                key={t.id}
                className="border-border/60 hover:bg-muted/30"
              >
                <TableCell className="pl-6 text-sm text-muted-foreground">
                  {t.date}
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium text-foreground">
                    {t.title}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {t.project}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.practice}
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground">
                  ${t.gross.toFixed(2)}
                </TableCell>
                <TableCell className="text-sm text-red-500">
                  -${t.commission.toFixed(2)}
                </TableCell>
                <TableCell className="text-sm font-bold text-emerald-600">
                  ${t.net.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                      t.status === "Paid"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-amber-50 text-amber-600 border-amber-200"
                    }`}
                  >
                    {t.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
