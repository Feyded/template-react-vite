import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseDeleteProductQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await wait(500);

      const products = JSON.parse(localStorage.getItem("products") ?? "[]");

      const product = products.find(
        (product: { id: string }) => product.id === id,
      );

      if (!product) throw new Error("Product not found!");

      const updatedProducts = products.filter(
        (product: { id: string }) => product.id !== id,
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
