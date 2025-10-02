"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { formatISO9075 } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { User } from "better-auth";

export function UsersTable() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isRemoving, setIsRemoving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await authClient.admin.listUsers(
        {
          query: {},
        },
        {
          throw: true,
        }
      );

      return data?.users ?? [];
    },
  });

  const handleDeleteUser = async (userId: string) => {
    setIsRemoving(true);
    try {
      await authClient.admin.removeUser({
        userId: userId,
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsRemoving(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>メールアドレス</TableHead>
            <TableHead>ユーザー名</TableHead>
            <TableHead>権限</TableHead>
            <TableHead>作成日</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{formatISO9075(user.createdAt)}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size={"sm"}
                  onClick={() => {
                    setSelectedUser(user);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                本当に「ユーザー: {selectedUser.name}」を削除しますか？
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteUser(selectedUser.id)}
                disabled={isLoading}
              >
                {isLoading && <Loader2Icon className="animate-spin" />}
                削除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
