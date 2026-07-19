"use client";

import {
  Bell,
  BriefcaseMedical,
  ChevronDown,
  CreditCard,
  DollarSign,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  User,
  Wallet,
} from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useCookies } from "react-cookie";

const outfit = Outfit({ subsets: ["latin"] });

const DENTIST_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  // { label: "Subscription", href: "/billing", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: User },
];

const DESIGNER_NAV = [
  { label: "Dashboard", href: "/designer/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/designer/projects", icon: BriefcaseMedical },
  { label: "Wallet", href: "/designer/wallet", icon: Wallet },
  { label: "Earnings", href: "/designer/earnings", icon: DollarSign },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  // { label: "Subscription", href: "/designer/subscription", icon: CreditCard },
  { label: "Profile", href: "/designer/profile", icon: User },
];

function isDesignerRoute(path: string) {
  return path.startsWith("/designer");
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesigner = isDesignerRoute(pathname);
  const nav = isDesigner ? DESIGNER_NAV : DENTIST_NAV;
  const [{ token }, , removeCookie] = useCookies(["token"]);

  return (
    <div className="portal-light min-h-screen bg-[#f0f2f5] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-white border-r border-border/60 fixed top-0 bottom-0 left-0 z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-border/60">
          <Link href="/">
            <span
              className={cn(
                "text-xl font-bold text-foreground",
                outfit.className,
              )}
            >
              exo connect
            </span>
          </Link>
        </div>

        {/* Role badge */}
        <div className="px-4 pt-4">
          <div
            className={cn(
              "text-xs font-semibold px-3 py-1.5 rounded-lg text-center",
              isDesigner
                ? "bg-primary/10 text-primary"
                : "bg-blue-50 text-blue-600",
            )}
          >
            {isDesigner ? "Designer Portal" : "Practice Portal"}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Settings + logout */}
        <div className="border-t border-border/60 px-3 py-3 space-y-0.5">
          {/* <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
          >
            <Settings size={16} />
            Settings
          </Link> */}
          <Button
            onClick={() => {
              try {
                removeCookie("token", { path: "/" });
                window.location.href = "/";
              } catch (e) {
                console.error("Error removing cookie:", e);
              }
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-border/60 px-6 py-3 flex items-center justify-between">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="size-9 p-0 lg:hidden text-muted-foreground"
              >
                <Menu size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 p-0 flex flex-col bg-background"
            >
              <div className="px-6 py-5 border-b border-border/60">
                <span
                  className={cn(
                    "text-xl font-bold text-foreground",
                    outfit.className,
                  )}
                >
                  exo connect
                </span>
              </div>
              <div className="px-4">
                {/* <div
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-lg text-center",
                    isDesigner
                      ? "bg-primary/10 text-primary"
                      : "bg-blue-50 text-blue-600",
                  )}
                >
                  {isDesigner ? "Designer Portal" : "Practice Portal"}
                </div> */}
              </div>
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {nav.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      )}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-border/60 px-3 py-3">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={16} />
                  Sign Out
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center text-sm font-semibold text-foreground gap-2 border border-foreground/10 rounded-lg p-2">
            <div className="size-2 rounded-full bg-green-500"></div>Available
            <Switch />
          </div>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="size-9 p-0 text-muted-foreground relative"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted/60 transition-colors"
                >
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                      {isDesigner ? "SC" : "BS"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {isDesigner ? "Sarah Chen" : "Bright Smiles"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isDesigner ? "CAD Designer" : "Dental Practice"}
                    </p>
                  </div>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={isDesigner ? "/designer/profile" : "/profile"}>
                    <User size={14} className="mr-2" /> Profile
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Settings size={14} className="mr-2" /> Settings
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={() => {
                    try {
                      removeCookie("token", { path: "/" });
                      window.location.href = "/";
                    } catch (e) {
                      console.error("Error removing cookie:", e);
                    }
                  }}
                  asChild
                >
                  <Link href="/auth/login">
                    <LogOut size={14} className="mr-2" /> Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
