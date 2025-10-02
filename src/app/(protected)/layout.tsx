import { Wrapper } from "@/components/layout/Wrapper";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSiderbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <AppSidebar />
      <main className="flex-1">
        <div className="p-2 border-b">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </Wrapper>
  );
}
