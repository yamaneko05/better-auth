"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "../ui/sidebar";

const queryClient = new QueryClient();

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>{children}</SidebarProvider>
    </QueryClientProvider>
  );
}
