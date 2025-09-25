import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package } from "lucide-react";
import formatPrice from "@/utils/format-price";

const orders = [
  {
    id: "a137b840-19b9-43ef-9196-c4085e7219cb",
    quantity: 2,
    product: {
      id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
      name: "Bluetooth Speaker Pro",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
      price: 6499,
    },
  },
  {
    id: "819a3d02-f8d1-4310-aebc-5acbb5a89cb5",
    quantity: 1,
    product: {
      id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
      name: "Fitness Tracker X2",
      image:
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",
      price: 8999,
    },
  },
  {
    id: "977b88f4-e204-41ec-9b8a-0351819b9713",
    quantity: 1,
    product: {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "Gaming Desktop Elites",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80",
      price: 45999,
    },
  },
];

const PaidOrdersDisplay = () => {
  const totalOrders = orders.length;
  const totalValue = orders.reduce(
    (sum, order) => sum + order.product.price * order.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Paid Orders</h1>
          <p className="text-muted-foreground mt-1">
            {totalOrders} orders • Total value: {formatPrice(totalValue)}
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
        {orders.map((order) => (
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
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="h-20 w-20 rounded-lg bg-gray-100 object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {order.product.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm">
                      <Package className="mr-1 h-4 w-4" />
                      Quantity: {order.quantity}
                    </div>
                    <div className="text-sm">
                      Unit Price: {formatPrice(order.product.price)}
                    </div>
                  </div>

                  {/* Total for this order */}
                  <div className="mt-3 border-t border-gray-100 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Order Total:</span>
                      <span className="text-lg font-bold">
                        {formatPrice(order.product.price * order.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Footer */}
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">
                All {totalOrders} orders have been successfully paid
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {formatPrice(totalValue)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaidOrdersDisplay;
