import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteUserMutation from "@/hooks/query/users/use-delete-user-mutation";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useUpdateUserMutation from "@/hooks/query/users/use-update-user-mutation";
import type { formSchema } from "./create-user-button";
import type z from "zod";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";

export default function UserActionCell({ user }: { user: User }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUserMutation();

  const handleDelete = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        toast.success("User deleted successfully!");
        setOpenDelete(false);
      },
      onError: () => {
        toast.error("User failed to deleted!");
        setOpenDelete(false);
      },
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateUser(
      { id: user.id, ...values },
      {
        onSuccess: () => {
          toast.success("User Updated successfully!");
          setOpenEdit(false);
        },
        onError: (error) => {
          form.reset();
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open menu</span>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          {/* Copy ID */}
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(String(user.id));
            }}
          >
            <Edit /> Copy ID
          </DropdownMenuItem>

          {/* Edit */}
          <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenEdit(true);
                }}
              >
                <Edit /> Edit
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit User</AlertDialogTitle>
                <AlertDialogDescription>
                  Make changes to the user&apos;’s information below. Ensure all
                  details are correct before saving.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Form {...form}>
                <form
                  id="edit-user-form"
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isUpdating}>
                      Cancel
                    </AlertDialogCancel>
                    <Button type="submit" loading={isUpdating}>
                      Save Changes
                    </Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDelete(true);
                }}
              >
                <Trash2 /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  user and remove data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <Button onClick={handleDelete} loading={isDeleting}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
