import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import UserActionCell from "./user-action-cell";
import type { User } from "@/types/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

export const columns: ColumnDef<User>[] = [
  {
    id: "avatar",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="ml-5">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.avatar}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "action",
    cell: ({ row }) => <UserActionCell user={row.original} />,
  },
];
