import { db } from "@/db";
import { wait } from "@/utils/wait";
import { useMutation } from "@tanstack/react-query";

type LoginFormData = {
  email: string;
  password: string;
};

export default function useAuthMutation() {
  return useMutation({
    mutationFn: async (formData: LoginFormData) => {
      await wait(500);
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(db.users));
      }

      const users = JSON.parse(localStorage.getItem("users") ?? "[]");

      const user = users.find(
        (user: LoginFormData) =>
          user.email === formData.email && user.password === formData.password,
      );

      if (!user) {
        throw new Error("Incorrect Email or password");
      }

      return user;
    },
  });
}
