import type { Cart } from "@/types/cart";
import type { Product } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function UseAddItemQuantityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const cartStr = localStorage.getItem("cart");
      const cart = cartStr ? JSON.parse(cartStr) : [];
      const updatedCart = cart.map(
        (cart: { id: string; quantity: number; product: Product }) => {
          if (cart.id === id) {
            if (cart.quantity >= cart.product.quantity) {
              throw new Error("Maximum Stock available!");
            }
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        },
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },

    onMutate: async (id: string) => {
      const previousCart = queryClient.getQueryData<Cart>(["cart"]);
      queryClient.setQueryData<Cart>(
        ["cart"],
        (cart) =>
          cart?.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ) || [],
      );
      return { previousCart };
    },
    
    onError: (err, _id, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      toast.error(err.message);
    },
  });
}
