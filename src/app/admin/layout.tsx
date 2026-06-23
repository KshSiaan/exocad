"use client";

import {
  AlertCircle,
  BarChart3,
  Bell,
  ClipboardList,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Designers", href: "/admin/designers", icon: Users },
  { label: "Projects", href: "/admin/practices", icon: ClipboardList },
  { label: "Disputes", href: "/admin/disputes", icon: AlertCircle },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Files", href: "/admin/files", icon: FolderOpen },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Wallet", href: "/admin/wallet", icon: Wallet },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="px-6 py-5 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-lg text-foreground">ExoConnect</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-10 rounded-lg px-3 gap-3 font-medium text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-10 rounded-lg px-3 gap-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted font-medium"
            >
              <Link href="/">
                <LogOut size={16} />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function AdminHeader() {
  const pathname = usePathname();
  const current = NAV_ITEMS.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href),
  );

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <h1 className="font-semibold text-foreground text-lg">
          {current?.label ?? "Admin"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search
            size={14}
            className="absolute left-3 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-lg bg-muted border border-border pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              AD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="admin-light flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-6 bg-[#f4f6f8]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
