import { wait } from "@/utils/wait";
import { useQuery } from "@tanstack/react-query";

export default function UseCheckoutQuery() {
  return useQuery({
    queryKey: ["checkout"],
    queryFn: async () => {
      await wait(500);
      
      const ordersStr = localStorage.getItem("orders");
      const orders = ordersStr ? JSON.parse(ordersStr) : [];

      return orders;
    },
  });
}
