import type { Product } from "@/types/product";
import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseAddToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      await wait(500);
      const cartStr = localStorage.getItem("cart");

      const cart = cartStr ? JSON.parse(cartStr) : [];

      const existIndex = cart.findIndex(
        (item: { product: Product }) => item.product.id === product.id,
      );

      if (existIndex === -1) {
        cart.push({
          id: crypto.randomUUID(),
          quantity: 1,
          product,
        });
        return localStorage.setItem("cart", JSON.stringify(cart));
      }

      if (cart[existIndex].quantity >= cart[existIndex].product.quantity) {
        throw new Error("Max item quantity");
      }

      cart[existIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
