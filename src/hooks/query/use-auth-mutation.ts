import { db } from "@/db";
import { wait } from "@/utils/wait";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

export default function useAuthMutation() {
  const navigate = useNavigate();
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

      localStorage.setItem("token", JSON.stringify(user));

      return user;
    },
    onSuccess: (user) => {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
  });
}
