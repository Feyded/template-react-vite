import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type LucideIcon } from "lucide-react";

type CardDashboardProps = {
  title: string;
  icon: LucideIcon;
  count: number; 
  label: string;
  loading?: boolean;
};

export default function CardDashboard({
  title,
  count,
  label,
  icon: Icon,
  loading = false,
}: CardDashboardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-10 w-20" /> 
        ) : (
          <div className="text-4xl font-bold">{count}</div>
        )}
        <p className="text-muted-foreground mt-1 text-xs">
          Total {label} in database
        </p>
      </CardContent>
    </Card>
  );
}
