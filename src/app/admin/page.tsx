import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateUserDialog } from "./CreateUserDialog";
import { UsersTable } from "./UsersTable";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role != "admin") redirect("/sign-in");

  return (
    <div className="p-2">
      <CreateUserDialog />
      <div className="mt-6">
        <UsersTable />
      </div>
    </div>
  );
}
