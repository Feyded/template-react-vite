import type { Cart } from "@/types/cart";
import type { Order } from "@/types/order";
import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cart: Cart) => {
      await wait(500);

      const newOrder: Order = {
        id: crypto.randomUUID(),
        cart,
      };

      const ordersStr = localStorage.getItem("orders");
      const orders = ordersStr ? JSON.parse(ordersStr) : [];

      const updatedOrders = [...orders, newOrder];

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      localStorage.removeItem("cart");

      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
