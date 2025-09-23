import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseCreateProductQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      name: string;
      description: string;
      image: string;
      quantity: number;
      price: number;
    }) => {
      await wait(500);
      const products = JSON.parse(localStorage.getItem("products") ?? "[]");

      const newProduct = {
        id: crypto.randomUUID(),
        ...formData,
      };

      const updatedProducted = [...products, newProduct];

      localStorage.setItem("products", JSON.stringify(updatedProducted));

      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
