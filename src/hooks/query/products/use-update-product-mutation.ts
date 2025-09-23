import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UseUpdateProductQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: {
      id: string;
      name: string;
      description: string;
      image: string;
      quantity: number;
      price: number;
    }) => {
      await wait(500);

      const { id, name, description, image, quantity, price } = formData;

      const products = JSON.parse(localStorage.getItem("products") ?? "[]");

      const updatedProducts = products.map((product: { id: string }) =>
        product.id === id
          ? { ...product, name, description, image, quantity, price }
          : product,
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return formData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
