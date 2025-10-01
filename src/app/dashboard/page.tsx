import { redirect } from "next/navigation";
import UserCard from "./UserCard";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  return (
    <div className="p-2">
      <h2 className="font-bold text-2xl">ダッシュボード</h2>
      <div className="mt-6">
        <UserCard session={session} />
      </div>
    </div>
  );
}
