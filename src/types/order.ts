import type { Cart } from "./cart";

export type Order = {
  id: string;
  total: number;
  tax: number;
  cart: Cart;
};
