import { MenuIcon, MountainIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-background border-b sticky top-0 z-20 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="#" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="font-bold text-lg">Blog App</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            Categories
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            Sign In
          </Link>
          <div className="flex items-center gap-4 absolute">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4">
                  <Link to="#" className="text-foreground hover:text-primary">
                    Home
                  </Link>
                  <Link to="#" className="text-foreground hover:text-primary">
                    Categories
                  </Link>
                  <Link to="#" className="text-foreground hover:text-primary">
                    About
                  </Link>
                  <Link to="#" className="text-foreground hover:text-primary">
                    Contact
                  </Link>
                  <Link to="#" className="text-foreground hover:text-primary">
                    Sign In
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

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
                <Link to="#" className="text-foreground hover:text-primary">
                  Home
                </Link>
                <Link to="#" className="text-foreground hover:text-primary">
                  Categories
                </Link>
                <Link to="#" className="text-foreground hover:text-primary">
                  About
                </Link>
                <Link to="#" className="text-foreground hover:text-primary">
                  Contact
                </Link>
                <Link to="#" className="text-foreground hover:text-primary">
                  Sign In
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
