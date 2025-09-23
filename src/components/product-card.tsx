import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import UseAddToCartMutation from "@/hooks/query/cart/use-add-to-cart-mutation";
import type { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { mutate, isPending } = UseAddToCartMutation();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    if (!localStorage.getItem("token")) return navigate("/login");
    mutate(product, {
      onSuccess: () => {
        toast.success("Item Added Successfully!");
      },
      onError: (error) => {
        toast.error(error.message ?? "Network Error");
      },
    });
  };

  return (
    <Card className="group bg-card border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="text-card-foreground mb-2 line-clamp-1 text-lg font-semibold">
          {product.name}
        </h3>
        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary text-2xl font-bold">
          ₱{product.price}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          onClick={() => handleAddToCart(product)}
          loading={isPending}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
