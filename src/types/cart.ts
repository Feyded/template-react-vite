import type { Product } from "./product";

export type Cart = CartItem[];

export type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};
