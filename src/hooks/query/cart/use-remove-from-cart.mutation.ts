import { wait } from "@/utils/wait";
import { useMutation } from "@tanstack/react-query";

export default function UseRemoveFromCartMutation() {
  return useMutation({
    mutationFn: async (id: string) => {
      await wait(500);
      const cartStr = localStorage.getItem("cart");

      const cart = cartStr ? JSON.parse(cartStr) : [];

      const filteredCart = cart.filter(
        (cart: { id: string }) => cart.id !== id,
      );

      localStorage.setItem("cart", JSON.stringify(filteredCart));
    },
  });
}
