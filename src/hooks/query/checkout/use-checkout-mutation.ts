import { useAuthContext } from "@/contexts/AuthContext";
import type { Cart } from "@/types/cart";
import type { Order } from "@/types/order";
import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCheckoutMutationArgs = {
  cart: Cart;
  tax: number;
  total: number;
};

export default function UseCheckoutMutation() {
  const queryClient = useQueryClient();
  const { wallet, setWallet } = useAuthContext();

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
      setWallet(updatedWallet.wallet);

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
