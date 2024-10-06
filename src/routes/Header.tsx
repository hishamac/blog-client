import { MenuIcon, MountainIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function Header() {
  const { getUser, user } = useUserStore();
  useEffect(() => {
    localStorage.getItem("user") &&
      getUser((jwtDecode(localStorage.getItem("user") as string) as any).id);
  });
  return (
    <header className="bg-background border-b sticky top-0 z-20 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="#" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="font-bold text-lg">Blog App</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link
            to="/posts"
            className="text-muted-foreground hover:text-foreground"
          >
            Posts
          </Link>
          <Link
            to="bloggers"
            className="text-muted-foreground hover:text-foreground"
          >
            Bloggers
          </Link>
        </nav>

        {localStorage.getItem("user") ? (
          <div className="md:flex items-center gap-4 hidden">
            <p className="text-sm font-medium text-primary">Logged In as</p>
            <Button asChild variant="outline" size="sm">
              <p>{user?.name}</p>
            </Button>
          </div>
        ) : (
          <div className="md:flex items-center gap-4 hidden">
            <Link
              to="/signin"
              className="text-sm font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}

        <div className="flex items-center gap-4 absolute right-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-foreground hover:text-primary">
                  Home
                </Link>
                <Link
                  to="/posts"
                  className="text-foreground hover:text-primary"
                >
                  Posts
                </Link>
                <Link
                  to="bloggers"
                  className="text-foreground hover:text-primary"
                >
                  BLoggers
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
