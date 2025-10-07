"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { formatISO9075 } from "date-fns";
import { UserWithRole } from "better-auth/plugins";

export function UsersTable({
  users,
  handleOpenRemoveUserAlertDialog,
  handleOpenEditUserDialog,
}: {
  users: UserWithRole[];
  handleOpenRemoveUserAlertDialog: (user: UserWithRole) => void;
  handleOpenEditUserDialog: (user: UserWithRole) => void;
}) {
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{formatISO9075(user.createdAt)}</TableCell>
              <TableCell>
                <Button
                  size={"sm"}
                  onClick={() => {
                    handleOpenEditUserDialog(user);
                  }}
                >
                  <EditIcon className="size-4" />
                </Button>
                <Button
                  variant="destructive"
                  size={"sm"}
                  onClick={() => {
                    handleOpenRemoveUserAlertDialog(user);
                  }}
                  className="ml-2"
                >
                  <TrashIcon className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
