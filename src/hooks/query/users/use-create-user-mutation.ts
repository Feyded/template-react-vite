import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      username: string;
      email: string;
      password: string;
    }) => {
      await wait(500);

      const users: { id: string; email: string; username: string }[] =
        JSON.parse(localStorage.getItem("users") ?? "[]");

      const duplicate = users.find(
        (user) =>
          user.email === formData.email || user.username === formData.username,
      );

      if (duplicate) {
        if (duplicate.email === formData.email) {
          throw new Error("Email already exists");
        }
        if (duplicate.username === formData.username) {
          throw new Error("Username already exists");
        }
      }

      const newUser = { id: crypto.randomUUID(), role: "user", ...formData };

      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return newUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
