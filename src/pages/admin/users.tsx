import CreateUserButton from "../../components/admin/user/create-user-button";
import { columns } from "@/components/admin/user/user-columns";
import { DataTable } from "@/components/ui/data-table";
import useUsersQuery from "@/hooks/query/users/use-users-query";

export default function UsersPage() {
  const { data, isFetching } = useUsersQuery();
  return (
    <div>
      <CreateUserButton />
      <DataTable columns={columns} data={data || []} loading={isFetching} />
    </div>
  );
}
