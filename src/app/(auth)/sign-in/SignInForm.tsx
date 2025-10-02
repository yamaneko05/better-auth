"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErrorAlert } from "@/components/common/FormErrorAlert";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { signInSchema } from "@/schemas";

export function SigninForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof signInSchema>) => {
    const { data, error } = await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard",
        rememberMe: true,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          setError("root", { message: ctx.error.message });
        },
      }
    );
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>メールアドレス</Label>
          <Input {...register("email")} />
          {errors.email?.message && (
            <FormErrorAlert>{errors.email?.message}</FormErrorAlert>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>パスワード</Label>
          <Input {...register("password")} />
          {errors.password?.message && (
            <FormErrorAlert>{errors.password?.message}</FormErrorAlert>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        {errors.root?.message && (
          <FormErrorAlert>{errors.root?.message}</FormErrorAlert>
        )}
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading && <Loader2Icon className="animate-spin" />}
          送信
        </Button>
      </div>
    </>
  );
}
