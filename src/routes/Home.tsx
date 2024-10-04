import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" to="/">
              <span className="hidden font-bold sm:inline-block">BlogApp</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/">Home</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <nav className="flex items-center">
              <Button variant="ghost" className="mr-2">
                Sign In
              </Button>
              <Button>Sign Up</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Featured Blog Posts Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Featured Posts</h2>
            <div className="relative">
              <div className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
                {[1, 2, 3].map((post) => (
                  <div
                    key={post}
                    className="snap-start flex-shrink-0 w-full md:w-2/3 lg:w-1/2 pr-4"
                  >
                    <Card>
                      <CardContent className="p-0">
                        <img
                          src={`/placeholder.svg?height=400&width=800`}
                          alt={`Featured post ${post}`}
                          className="w-full h-64 object-cover"
                        />
                      </CardContent>
                      <CardHeader>
                        <CardTitle>Featured Post Title {post}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          By Author Name
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p>
                          This is a brief excerpt from the featured blog post...
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button>Read More</Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Latest Blog Posts Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((post) => (
                <Card key={post}>
                  <CardContent className="p-0">
                    <img
                      src={`/placeholder.svg?height=200&width=400`}
                      alt={`Post ${post}`}
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle>Latest Post Title {post}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      By Author Name • {new Date().toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p>This is a brief excerpt from the latest blog post...</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Read More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Top Posts Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Top Posts</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((post) => (
                <Card key={post} className="flex">
                  <CardContent className="p-0 flex-shrink-0">
                    <img
                      src={`/placeholder.svg?height=150&width=150`}
                      alt={`Top post ${post}`}
                      className="w-36 h-full object-cover"
                    />
                  </CardContent>
                  <div className="flex flex-col justify-between p-4">
                    <div>
                      <CardTitle className="text-lg">
                        Top Post Title {post}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        1.2k views • 98 comments
                      </p>
                    </div>
                    <Button variant="link" className="self-start p-0">
                      Read More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Top Writers Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Top Writers</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((writer) => (
                <Card key={writer}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20">
                        <AvatarImage
                          src={`/placeholder.svg?height=80&width=80`}
                          alt={`Writer ${writer}`}
                        />
                        <AvatarFallback>W{writer}</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 font-semibold">
                        Writer Name {writer}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Short bio goes here...
                      </p>
                      <p className="text-sm mt-2">42 posts • 1.5k followers</p>
                      <Button className="mt-4">Follow</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Categories/Tags Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Technology",
                "Lifestyle",
                "Food",
                "Travel",
                "Health",
                "Fashion",
              ].map((category) => (
                <Button key={category} variant="outline">
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {/* Call to Action (CTA) */}
          <section className="mb-12 bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-6">
              Subscribe to our newsletter for the latest blog posts and updates.
            </p>
            <div className="flex max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
          </section>

          {/* Optional Advertisement Section */}
          <section className="mb-12">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Advertisement
                </p>
                <div className="bg-muted h-32 flex items-center justify-center">
                  <p>Your Ad Here</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground">
                BlogApp is your go-to platform for insightful articles on
                various topics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
