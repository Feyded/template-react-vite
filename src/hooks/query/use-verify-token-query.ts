import { wait } from "@/utils/wait";
import { useQuery } from "@tanstack/react-query";

export default function UseVerifyTokenQuery() {
  return useQuery({
    queryKey: ["verify-token"],
    queryFn: async () => {
      await wait(1000);

      if (!localStorage.getItem("token")) {
        throw new Error("Token is not valid");
      }

      const users = JSON.parse(localStorage.getItem("users") ?? "[]");
      const token = JSON.parse(localStorage.getItem("token") ?? "");

      const exist = users.find(
        (user: { id: string; email: string }) =>
          user.id === token.id && user.email === token.email,
      );

      if (!exist) {
        throw new Error("Token is expired");
      }

      return exist;
    },
  });
}
