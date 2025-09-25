import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateUserMutation from "@/hooks/query/users/use-update-user-mutation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import useCartQuery from "@/hooks/query/cart/use-cart-query";
import { useAuthContext } from "@/contexts/AuthContext";

const formSchema = z.object({
  avatar: z.string(),
  username: z.string(),
  email: z.email(),
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateUserMutation();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { data } = useCartQuery();
  const cartCount = useMemo(() => {
    return (data ?? []).reduce(
      (acc: number, item: { quantity: number }) => acc + item.quantity,
      0,
    );
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: user?.avatar,
      username: user?.username,
      email: user?.email,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form]);

  const handleLogout = async () => {
    logout();
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user?.id) {
      toast.error("Authentication required");
      return;
    }

    mutate(
      { id: user?.id, ...values },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Update Successfull!");
        },
        onError: () => {
          toast.error("Failed to update!");
        },
      },
    );
  };

  return (
    <nav className="flex items-center justify-between px-5 py-3">
      <Link to="/">
        <LayoutDashboard />
      </Link>
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Button size="icon" variant="ghost" asChild>
                  <Link to="/cart">
                    <ShoppingCart />
                  </Link>
                </Button>
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cart</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" asChild>
                <Link to="/orders">
                  <ShoppingBag />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Checkout</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" asChild>
                <Link to="/orders">
                  <CreditCard />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Balance</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.username[0] ?? "N"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Profile
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      id="update-user-form"
                      className="space-y-4"
                      onSubmit={form.handleSubmit(handleSubmit)}
                    >
                      <FormField
                        name="avatar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
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
                    </form>
                  </Form>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      form="update-user-form"
                      loading={isPending}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    Log out
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will log you out.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleLogout}>
                      Logout
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </nav>
  );
}
