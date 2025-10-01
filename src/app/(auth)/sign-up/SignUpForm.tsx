"use client";

import { authClient } from "@/utils/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import FormErrorAlert from "../../../components/common/FormErrorAlert";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export default function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/dashboard",
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
        <div className="flex flex-col gap-2">
          <Label>ユーザー名</Label>
          <Input {...register("name")} />
          {errors.name?.message && (
            <FormErrorAlert>{errors.name?.message}</FormErrorAlert>
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
