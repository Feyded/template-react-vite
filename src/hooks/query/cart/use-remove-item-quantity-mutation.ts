import type { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";

export default function UseRemoveItemQuantityMutation() {
  return useMutation({
    mutationFn: async (id: string) => {
      const cartStr = localStorage.getItem("cart");
      const cart = cartStr ? JSON.parse(cartStr) : [];

      const updatedCart = cart.map(
        (cart: { id: string; quantity: number; product: Product }) => {
          if (cart.id === id) cart.quantity--;
          return cart;
        },
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
  });
}
