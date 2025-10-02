import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { LayoutDashboardIcon, UsersIcon } from "lucide-react";
import { headers } from "next/headers";

const items = [
  {
    title: "ダッシュボード",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
];

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {session?.user.role == "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/admin">
                      <UsersIcon />
                      <span>ユーザー管理</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
