import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UseDeleteProductQuery from "@/hooks/query/products/use-delete-product-mutation";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import UseUpdateProductQuery from "@/hooks/query/products/use-update-product-mutation";
import { useForm } from "react-hook-form";
import type { formSchema } from "./create-product-button";
import type z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/product";

export default function ProductActionCell({ product }: { product: Product }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: product.name,
      description: product.description,
      image: product.image,
      quantity: product.quantity,
      price: product.price,
    },
  });

  const { mutate: deleteProduct, isPending: isDeleting } =
    UseDeleteProductQuery();

  const { mutate: updateProduct, isPending: isUpdating } =
    UseUpdateProductQuery();

  const handleDelete = () => {
    deleteProduct(product.id, {
      onSuccess: () => {
        toast.success("Producted deleted successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateProduct(
      { id: product.id, ...values },
      {
        onSuccess: () => {
          setOpenEdit(false);
          toast.success("Producted updated successfully!");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil /> Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Make changes to the product information below. Ensure all
                  details are correct before saving.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  id="update-product-form"
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isUpdating}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  form="update-product-form"
                  loading={isUpdating}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDelete(true);
                }}
              >
                <Trash /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your product and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isUpdating}>
                  Cancel
                </AlertDialogCancel>
                <Button onClick={handleDelete} loading={isDeleting}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
