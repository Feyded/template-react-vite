import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthMutation from "@/hooks/query/use-auth-mutation";
import { login } from "@/store/auth-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircleIcon,
  Eye,
  EyeOff,
  Info,
  LayoutDashboard,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
});

export default function LoginPage() {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending } = useAuthMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (user) => {
        dispatch(login(user));
        toast.success("Login Successfull!");
        setError("");
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex justify-center">
            <LayoutDashboard className="size-12" />
          </CardTitle>

          <CardContent className="mt-4">
            <Form {...form}>
              <form
                id="login-form"
                className="space-y-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                {error && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                          <Input
                            id={field.name}
                            placeholder="Enter your email"
                            className="pl-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                          <Input
                            id={field.name}
                            placeholder="Enter your password"
                            className="pl-12"
                            type={show ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            className="absolute top-1/2 right-2 -translate-y-1/2"
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-label={
                              show ? "show password" : "hide password"
                            }
                            onClick={() => setShow(!show)}
                          >
                            {show ? (
                              <Eye className="size-4" />
                            ) : (
                              <EyeOff className="size-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit" loading={isPending}>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="mt-5 flex flex-col">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Demo Accounts</AlertTitle>
              <AlertDescription>
                <div className="mt-2 space-y-3 text-sm">
                  <div>
                    <p className="font-semibold">Admin</p>
                    <p>
                      Email:{" "}
                      <span className="text-muted-foreground">
                        alice@example.com
                      </span>
                    </p>
                    <p>
                      Password:{" "}
                      <span className="text-muted-foreground">password</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">User</p>
                    <p>
                      Email:{" "}
                      <span className="text-muted-foreground">
                        mark@example.com
                      </span>
                    </p>
                    <p>
                      Password:{" "}
                      <span className="text-muted-foreground">password</span>
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
