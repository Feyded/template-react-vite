import CardSkeleton from "@/components/card-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAddItemQuantityMutation from "@/hooks/query/cart/use-add-item-quantity-mutation";
import useCartQuery from "@/hooks/query/cart/use-cart-query";
import useCheckoutMutation from "@/hooks/query/cart/use-checkout-mutation";
import useRemoveFromCartMutation from "@/hooks/query/cart/use-remove-from-cart.mutation";
import useRemoveItemQuantityMutation from "@/hooks/query/cart/use-remove-item-quantity-mutation";
import type { Cart } from "@/types/cart";
import type { Product } from "@/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CartPage() {
  const [currentItem, setCurrentItem] = useState("");
  const { data, isFetching, isError } = useCartQuery();
  const { mutate: removeItem, isPending: removingItem } =
    useRemoveFromCartMutation();
  const { mutate: checkout, isPending: checkingOut } = useCheckoutMutation();
  const { mutate: addQuantity } = useAddItemQuantityMutation();
  const { mutate: removeQuantity } = useRemoveItemQuantityMutation();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const subTotal = useMemo(() => {
    return (data ?? []).reduce(
      (sum: number, item: { quantity: number; product: Product }) =>
        sum + item.product.price * item.quantity,
      0,
    );
  }, [data]);

  const tax = subTotal * 0.08;
  const total = subTotal + tax;

  const handleAddQuantity = (id: string) => {
    addQuantity(id, {
      onSuccess: () => {
        queryClient.setQueryData<Cart>(["cart"], (cart) =>
          cart?.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleRemoveQuantity = (id: string) => {
    removeQuantity(id, {
      onSuccess: () => {
        queryClient.setQueryData<Cart>(["cart"], (cart) =>
          cart?.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleRemoveItem = (id: string) => {
    setCurrentItem(id);
    removeItem(id, {
      onSuccess: () => {
        toast.success("Item removed from cart.");
        queryClient.setQueryData<Cart>(["cart"], (cart) =>
          cart?.filter((item) => item.id !== id),
        );
      },
    });
  };

  const handleCheckout = () => {
    checkout(undefined, {
      onSuccess: () => {
        toast.success("Checkout successfull!");
      },
    });
  };

  if (isFetching || isError) {
    return (
      <div className="container mx-auto max-w-4xl space-y-4 px-4 py-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      {data.length > 0 ? (
        <>
          <div className="space-y-4">
            {data.map(
              (product: { id: string; quantity: number; product: Product }) => (
                <Card key={product.product.id} className="p-4">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={product.product.image || "/placeholder.svg"}
                          alt={product.product.description}
                          className="h-24 w-24 rounded-md object-cover"
                        />
                      </div>

                      {/* Product Description */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-foreground mb-2 text-lg font-medium">
                          {product.product.description}
                        </h3>
                        <p className="text-foreground text-2xl font-bold">
                          ₱{product.product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            disabled={product.quantity <= 1}
                            onClick={() => handleRemoveQuantity(product.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="min-w-[3rem] px-3 py-1 text-center">
                            {product.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleAddQuantity(product.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                          onClick={() => handleRemoveItem(product.id)}
                          disabled={removingItem && currentItem === product.id}
                        >
                          {removingItem && currentItem === product.id ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
          <Card className="mt-8 p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>₱{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Tax:</span>
                <span>₱{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="mt-6 w-full"
                size="lg"
                loading={checkingOut}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <div className="mt-48 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <ShoppingBag className="text-foreground mb-4 h-16 w-16" />
            <p className="text-muted-foreground">Your Cart is empty!</p>
            <Button onClick={() => navigate("/")} className="mt-3">
              <Tag />
              Start Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
