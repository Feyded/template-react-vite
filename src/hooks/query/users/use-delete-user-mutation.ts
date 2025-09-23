import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await wait(500);
      const users = JSON.parse(localStorage.getItem("users") ?? "[]");
      const updatedUsers = users.filter(
        (user: { id: string }) => user.id !== id,
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
