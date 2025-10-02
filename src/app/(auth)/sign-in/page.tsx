import { SigninForm } from "@/app/(auth)/sign-in/SignInForm";
import { Card, CardContent } from "@/components/ui/card";

export default async function SignInPage() {
  return (
    <div className="p-2 h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardContent>
          <h2 className="font-bold text-2xl">ログイン</h2>
          <div className="mt-6">
            <SigninForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
