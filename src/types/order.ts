import type { Cart } from "./cart";

export type Order = {
  id: string;
  cart: Cart;
};
