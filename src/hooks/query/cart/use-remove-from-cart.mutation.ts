import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseRemoveFromCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const cartStr = localStorage.getItem("cart");

      const cart = cartStr ? JSON.parse(cartStr) : [];

      const filteredCart = cart.filter(
        (cart: { id: string }) => cart.id !== id,
      );

      localStorage.setItem("cart", JSON.stringify(filteredCart));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
