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
import { editUserSchema } from "@/schemas";
import { useQueryClient } from "@tanstack/react-query";
import { UserWithRole } from "better-auth/plugins";

export function EditUserForm({
  user,
  onUpdated,
}: {
  user: UserWithRole;
  onUpdated: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
    },
  });

  const onSubmit = async (formData: z.infer<typeof editUserSchema>) => {
    setIsLoading(true);
    try {
      await authClient.admin.updateUser({
        userId: user.id,
        data: {
          email: formData.email,
          name: formData.name,
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onUpdated();
    } catch (error: any) {
      setError("root", { message: error.message });
    } finally {
      setIsLoading(false);
    }
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
