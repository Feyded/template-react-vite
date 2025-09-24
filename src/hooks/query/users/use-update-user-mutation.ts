import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      id: string;
      username: string;
      email: string;
    }) => {
      await wait(500);
      const { id, username, email } = formData;
      const users = JSON.parse(localStorage.getItem("users") ?? "[]");

      const duplicate = users.find(
        (user: { id: string; email: string; username: string }) =>
          user.id !== id &&
          (user.email === email || user.username === username),
      );

      if (duplicate) {
        if (duplicate.username === username) {
          throw new Error("Username already exist!");
        }
        if (duplicate.email === email) {
          throw new Error("Email already exist!");
        }
      }

      const updatedUsers = users.map((user: { id: string }) =>
        user.id === id ? { ...user, username, email } : user,
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { id, username, email };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
