"use client";

import { authClient } from "@/lib/auth-client";
import UserCard from "./UserCard";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="p-2">
      <h2 className="font-bold text-2xl">ダッシュボード</h2>
      <div className="mt-6">{session && <UserCard user={session.user} />}</div>
    </div>
  );
}
