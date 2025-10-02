"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserCard({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSignOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
    setIsSignOut(false);
  };

  const [isSignOut, setIsSignOut] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>ユーザー</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl">{session.user.name}</div>
        <div className="text-gray-500">{session.user.email}</div>
        <div className="mt-6">
          <Button onClick={handleSignOut} disabled={isSignOut}>
            {isSignOut && <Loader2Icon className="animate-spin" />}
            ログアウト
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
