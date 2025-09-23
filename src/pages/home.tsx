import CardSkeleton from "@/components/card-skeleton";
import ProductCard from "@/components/product-card";
import useProductsQuery from "@/hooks/query/products/use-products.query";

export default function HomePage() {
  const { data, isFetching, isError } = useProductsQuery();

  if (isFetching || isError) {
    return (
      <div className="container mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {data?.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
