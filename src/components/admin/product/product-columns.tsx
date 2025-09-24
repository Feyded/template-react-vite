import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types/product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductActionCell from "./product-action-cell";

export const columns: ColumnDef<Product>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Avatar>
          <AvatarImage src={product.image} />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(product.price);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "action",
    cell: ({ row }) => <ProductActionCell product={row.original} />,
  },
];
