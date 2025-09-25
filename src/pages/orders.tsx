import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Tag } from "lucide-react";
import formatPrice from "@/utils/format-price";
import UseCheckoutQuery from "@/hooks/query/checkout/use-checkout-query";
import type { Order } from "@/types/order";
import type { Cart, CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "@/components/card-skeleton";

const PaidOrdersDisplay = () => {
  const navigate = useNavigate();
  const { data, isFetching } = UseCheckoutQuery();

  const calculateTotalOrders = (cart: Cart) => {
    const totalOrderQuantity = cart.reduce(
      (sum, cart) => (sum += cart.quantity),
      0,
    );

    return totalOrderQuantity;
  };

  if (isFetching) {
    return (
      <div className="max-w container mx-auto max-w-4xl space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <Package className="size-16" />
          <p className="text-muted-foreground mt-5">Your Order is empty!</p>
          <Button onClick={() => navigate("/")} className="mt-3">
            <Tag />
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {data.map((order: Order) => (
        <div key={order.id} className="space-y-6 p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Paid Orders</h1>
              <p className="text-muted-foreground mt-1">
                {calculateTotalOrders(order.cart)} orders • Total value:{" "}
                {formatPrice(order.total)}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 hover:bg-green-200"
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              All Paid
            </Badge>
          </div>

          {/* Orders Grid */}
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <Card
              key={order.id}
              className="transition-shadow duration-200 hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </CardTitle>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Paid
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {order.cart.map((cart: CartItem) => (
                  <div key={cart.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={cart.product.image}
                        alt={cart.product.name}
                        className="h-20 w-20 rounded-lg bg-gray-100 object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold">
                        {cart.product.name}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm">
                          <Package className="mr-1 h-4 w-4" />
                          Quantity: {cart.quantity}
                        </div>
                        <div className="text-sm">
                          Unit Price: {formatPrice(cart.product.price)}
                        </div>
                      </div>

                      {/* Total for this order */}
                      <div className="mt-3 border-t border-gray-100 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Order Total:
                          </span>
                          <span className="text-lg font-bold">
                            {formatPrice(cart.product.price * cart.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Summary Footer */}
          <Card className="border-2 border-dashed border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">
                    All {calculateTotalOrders(order.cart)} orders have been
                    successfully paid
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm">Total:</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Tax Section */}
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Tax (8%)</span>
                <span>{formatPrice(order.tax)}</span>
              </div>

              {/* Total Including Tax */}
              <div className="mt-1 flex justify-between font-semibold text-green-700">
                <span>Total Without Tax</span>
                <span>{formatPrice(order.total / 1.08)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PaidOrdersDisplay;
