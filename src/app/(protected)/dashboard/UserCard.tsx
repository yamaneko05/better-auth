"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { User } from "better-auth";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserCard({ user }: { user: User }) {
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
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>ログイン中のユーザー</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl">{user.name}</div>
        <div className="text-gray-500">{user.email}</div>
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
