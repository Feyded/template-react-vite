import { useQuery } from "@tanstack/react-query";
import { db } from "@/db";
import { wait } from "@/utils/wait";

export default function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      await wait(500);
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(db.users));
      }
      const users = JSON.parse(localStorage.getItem("users") ?? "[]");
      return users;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
}
