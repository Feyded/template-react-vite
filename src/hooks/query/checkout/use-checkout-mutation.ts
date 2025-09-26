import { setWallet } from "@/store/auth-slice";
import type { RootState } from "@/store/store";
import type { Cart } from "@/types/cart";
import type { Order } from "@/types/order";
import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

type UseCheckoutMutationArgs = {
  cart: Cart;
  tax: number;
  total: number;
};

export default function UseCheckoutMutation() {
  const queryClient = useQueryClient();
  const wallet = useSelector((state: RootState) => state.auth.wallet);

  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ cart, tax, total }: UseCheckoutMutationArgs) => {
      if (wallet < total) throw new Error("Insufficient Balance.");

      await wait(500);

      const newOrder: Order = {
        id: crypto.randomUUID(),
        tax,
        total,
        cart,
      };

      const userStr = localStorage.getItem("token");
      const user = userStr
        ? JSON.parse(userStr)
        : localStorage.removeItem("token");

      const updatedWallet = { ...user, wallet: wallet - total };
      dispatch(setWallet(updatedWallet.wallet));

      const ordersStr = localStorage.getItem("orders");
      const orders = ordersStr ? JSON.parse(ordersStr) : [];

      const updatedOrders = [...orders, newOrder];

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      localStorage.setItem("token", JSON.stringify(updatedWallet));
      localStorage.removeItem("cart");

      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
