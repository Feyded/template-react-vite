import { useQuery } from "@tanstack/react-query";
import { wait } from "@/utils/wait";

export default function useCartQuery() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      await wait(500);
      const cartStr = localStorage.getItem("cart");
      const cart = cartStr ? JSON.parse(cartStr) : [];
      return cart;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
}
