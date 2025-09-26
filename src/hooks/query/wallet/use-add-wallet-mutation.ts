import { wait } from "@/utils/wait";
import { useMutation } from "@tanstack/react-query";

export default function useAddWalletMutation() {
  return useMutation({
    mutationFn: async (formData: { wallet: number }) => {
      await wait(500);

      const userStr = localStorage.getItem("token");

      const user = userStr
        ? JSON.parse(userStr)
        : localStorage.removeItem("token");

      const updatedUserWallet = {
        ...user,
        wallet: user.wallet + formData.wallet,
      };

      localStorage.setItem("token", JSON.stringify(updatedUserWallet));

      return updatedUserWallet;
    },
  });
}
