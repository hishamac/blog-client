import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Login() {
  const { login } = useUserStore();
  const formSchema = z.object({
    email: z.string().email("Email must be Valid"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const checkLoggedIn = () => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
    }

    try {
      const user: any = jwtDecode(token as string);
      if (user.role === "admin" || user.role === "blogger") {
        navigate("/p");
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { email, password } = values;
    login(email, password);
  }

  const navigate = useNavigate();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full h-screen">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <div className="text-center mt-10">
            <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          </div>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className={`w-full opacity-100 cursor-pointer`}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </main>
  );
}
