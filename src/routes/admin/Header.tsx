import { MenuIcon, MountainIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  return (
    <header className="bg-background border-b sticky top-0 z-20 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {localStorage.getItem("user") &&
        (jwtDecode(localStorage.getItem("user") as string) as any).role ===
          "admin" ? (
          <Link to="/p" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Blog App Admin</span>
          </Link>
        ) : (
          <Link to="/p" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Blog App Blogger</span>
          </Link>
        )}

        {localStorage.getItem("user") &&
        (jwtDecode(localStorage.getItem("user") as string) as any).role ===
          "admin" ? (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/p/post"
              className="text-muted-foreground hover:text-foreground"
            >
              Posts
            </Link>
            <Link
              to="/p/post-type"
              className="text-muted-foreground hover:text-foreground"
            >
              Post Types
            </Link>
            <Link
              to="/p/user"
              className="text-muted-foreground hover:text-foreground"
            >
              Users
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/p/post"
              className="text-muted-foreground hover:text-foreground"
            >
              Posts
            </Link>
          </nav>
        )}
        {localStorage.getItem("user") && (
          <div className="md:flex items-center gap-4 hidden">
            <p className="text-sm font-medium text-primary">Logged In as</p>
            <Button asChild variant="outline" size="sm">
              <p>
                {(
                  jwtDecode(localStorage.getItem("user") as string) as any
                ).role.toUpperCase()}
              </p>
            </Button>
          </div>
        )}

        {localStorage.getItem("user") &&
        (jwtDecode(localStorage.getItem("user") as string) as any).role ===
          "admin" ? (
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
                  <p className="text-primary">
                    Logged In as
                    <Button variant={"secondary"} className="">
                      {" "}
                      {(
                        jwtDecode(localStorage.getItem("user") as string) as any
                      ).role.toUpperCase()}
                    </Button>
                  </p>
                  <Link
                    to="/p/post"
                    className="text-foreground hover:text-primary"
                  >
                    Posts
                  </Link>
                  <Link
                    to="/p/post-type"
                    className="text-foreground hover:text-primary"
                  >
                    Post Types
                  </Link>
                  <Link
                    to="/p/user"
                    className="text-foreground hover:text-primary"
                  >
                    Users
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
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
                  <Link
                    to="/p/post"
                    className="text-foreground hover:text-primary"
                  >
                    Posts
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </header>
  );
}
