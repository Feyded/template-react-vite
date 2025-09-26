import { setUser } from "@/store/auth-slice";
import { wait } from "@/utils/wait";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (formData: {
      id: string;
      username: string;
      email: string;
      avatar: string;
    }) => {
      await wait(500);
      const { id, username, email, avatar } = formData;

      const users = JSON.parse(localStorage.getItem("users") ?? "[]");
      const currentUser = JSON.parse(localStorage.getItem("token") || "");

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

      if (currentUser.id === id) {
        const updateUser = { ...currentUser, username, email, avatar };
        dispatch(setUser(updateUser));
        localStorage.setItem("token", JSON.stringify(updateUser));
      }

      const updatedUsers = users.map((user: { id: string }) =>
        user.id === id ? { ...user, avatar, username, email } : user,
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return { id, username, email };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
