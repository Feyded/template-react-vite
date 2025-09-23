import CreateProductButton from "@/components/admin/product/create-product-button";
import { columns } from "@/components/admin/product/product-columns";
import { DataTable } from "@/components/ui/data-table";
import useProductsQuery from "@/hooks/query/products/use-products.query";

export default function ProductsPage() {
  const { data, isFetching } = useProductsQuery();
  return (
    <div>
      <CreateProductButton />
      <DataTable columns={columns} data={data || []} loading={isFetching} />
    </div>
  );
}
