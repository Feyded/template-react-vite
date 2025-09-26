import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground text-lg">
        Oops! The page you are looking for does not exist.
      </p>
      <Button variant="default" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
}
