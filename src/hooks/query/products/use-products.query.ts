import { db } from "@/db";
import { wait } from "@/utils/wait";
import { useQuery } from "@tanstack/react-query";

export default function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      await wait(500);

      if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(db.products));
      }

      const products = JSON.parse(localStorage.getItem("products") ?? "[]");
      return products;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
}
