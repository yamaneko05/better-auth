import { SignUpForm } from "@/app/(auth)/sign-up/SignUpForm";
import { Card, CardContent } from "@/components/ui/card";

export default async function SignUpPage() {
  return (
    <div className="p-2 h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardContent>
          <h2 className="font-bold text-2xl">新規登録</h2>
          <div className="mt-6">
            <SignUpForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
