"use client";

import { UsersTable } from "./UsersTable";
import { authClient } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserWithRole } from "better-auth/plugins";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2Icon } from "lucide-react";
import { CreateUserForm } from "./CreateUserForm";
import { EditUserForm } from "./EditUserForm";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<UserWithRole>();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const { data: users } = useQuery({
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

  const handleRemoveUser = async (userId: string) => {
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
      setRemoveDialogOpen(false);
    }
  };

  return (
    <>
      <div className="p-3">
        <h2 className="text-2xl font-bold">ユーザー管理</h2>
        <div className="mt-6">
          <Button
            onClick={() => {
              setCreateDialogOpen(true);
            }}
          >
            ユーザーを作成
          </Button>
        </div>
        <div className="mt-6">
          {users && (
            <UsersTable
              users={users}
              handleOpenRemoveUserAlertDialog={(user: UserWithRole) => {
                setSelectedUser(user);
                setRemoveDialogOpen(true);
              }}
              handleOpenEditUserDialog={(user: UserWithRole) => {
                setSelectedUser(user);
                setEditDialogOpen(true);
              }}
            />
          )}
        </div>
      </div>
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ユーザーを作成</DialogTitle>
          </DialogHeader>
          <CreateUserForm
            onCreated={() => {
              setCreateDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      {selectedUser && (
        <>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ユーザーを編集</DialogTitle>
              </DialogHeader>
              <EditUserForm
                user={selectedUser}
                onUpdated={() => {
                  setEditDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <AlertDialog
            open={removeDialogOpen}
            onOpenChange={setRemoveDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  本当に「ユーザー: {selectedUser.name}」を削除しますか？
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleRemoveUser(selectedUser.id)}
                  disabled={isRemoving}
                >
                  {isRemoving && <Loader2Icon className="animate-spin" />}
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}
