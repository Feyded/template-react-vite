import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddWalletMutation from "@/hooks/query/wallet/use-add-wallet-mutation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import formatPrice from "@/utils/format-price";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setWallet } from "@/store/auth-slice";

export const formSchema = z.object({
  wallet: z.number().min(1).max(10000),
});

export default function AddWalletButton() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useAddWalletMutation();
  const wallet = useSelector((state: RootState) => state.auth.wallet);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallet: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (user) => {
        dispatch(setWallet(user.wallet));
        toast.success("Amount successfully added!");
        form.reset();
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <CreditCard />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Wallet</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Amount</DialogTitle>
          <DialogDescription>balance: {formatPrice(wallet)}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-wallet-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
            <Button disabled={isPending} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="add-wallet-form" loading={isPending}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
