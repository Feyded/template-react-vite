import CardDashboard from "@/components/admin/dashboard/dashboard-card";
import useProductsQuery from "@/hooks/query/products/use-products.query";
import useUsersQuery from "@/hooks/query/users/use-users-query";
import { Tag, User } from "lucide-react";

export default function DashboardPage() {
  const { data: products, isFetching: productsFetching } = useProductsQuery();
  const { data: users, isFetching: usersFetching } = useUsersQuery();

  return (
    <div className="grid grid-cols-4 gap-4">
      <CardDashboard
        icon={User}
        title="Users"
        count={users?.length ?? 0}
        label="users"
        loading={usersFetching}
      />
      <CardDashboard
        icon={Tag}
        title="Products"
        count={products?.length ?? 0}
        label="products"
        loading={productsFetching}
      />
    </div>
  );
}
