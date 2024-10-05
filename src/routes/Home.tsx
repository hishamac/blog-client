"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowRightIcon,
  EyeIcon,
  FilePenIcon,
  MenuIcon,
  MountainIcon,
  UsersIcon
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="bg-background border-b sticky top-0 z-20 w-full">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link to="#" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Blog App</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
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
      <main className="flex-1">
        <section className="bg-muted py-6 md:py-12">
          <div className="container mx-auto px-4">
            <Carousel className="max-w-[800px] mx-auto relative">
              <CarouselContent>
                <CarouselItem>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={300}
                      alt="Featured Post"
                      className="rounded-lg object-cover w-full md:w-1/2 aspect-[4/3]"
                    />
                    <div className="space-y-2 md:space-y-4 md:w-1/2">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">John Doe</span> • 2 days
                        ago
                      </div>
                      <h2 className="text-lg md:text-2xl font-bold">
                        Unlocking the Secrets of Productivity: Tips and Tricks
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base line-clamp-3 md:line-clamp-none">
                        Discover the ultimate guide to boosting your
                        productivity and achieving more in less time. Unlock the
                        secrets that will transform your workflow and help you
                        conquer your goals.
                      </p>
                      <Link
                        to="#"
                        className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                      >
                        Read More
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <img
                      src="/placeholder.svg"
                      width={400}
                      height={300}
                      alt="Featured Post"
                      className="rounded-lg object-cover w-full md:w-1/2 aspect-[4/3]"
                    />
                    <div className="space-y-2 md:space-y-4 md:w-1/2">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Jane Smith</span> • 1 week
                        ago
                      </div>
                      <h2 className="text-lg md:text-2xl font-bold">
                        The Art of Mindful Living: Cultivating Inner Peace
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base line-clamp-3 md:line-clamp-none">
                        Explore the transformative power of mindfulness and
                        learn how to incorporate it into your daily life.
                        Discover the secrets to achieving a more balanced and
                        fulfilling existence.
                      </p>
                      <Link
                        to="#"
                        className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                      >
                        Read More
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none">
                <CarouselPrevious className="relative left-0 translate-x-0 pointer-events-auto" />
                <CarouselNext className="relative right-0 translate-x-0 pointer-events-auto" />
              </div>
            </Carousel>
          </div>
        </section>
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Latest Posts</h2>
              <Link
                to="#"
                className="text-primary hover:underline text-sm md:text-base"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    width={400}
                    height={225}
                    alt="Blog Post"
                    className="rounded-t-lg object-cover w-full aspect-video"
                  />
                </CardContent>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Jane Doe</span> • 3 days ago
                  </div>
                  <h3 className="text-lg font-bold mt-2">
                    Mastering the Art of Baking: Delicious Recipes and
                    Techniques
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Discover the secrets to baking the perfect cakes, cookies,
                    and pastries. Learn from expert bakers and impress your
                    friends and family with your newfound skills.
                  </p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    width={400}
                    height={225}
                    alt="Blog Post"
                    className="rounded-t-lg object-cover w-full aspect-video"
                  />
                </CardContent>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">John Smith</span> • 1 week ago
                  </div>
                  <h3 className="text-lg font-bold mt-2">
                    Exploring the Wonders of Nature: A Hiking Guide
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Embark on a journey through the great outdoors and discover
                    the beauty of nature. Learn essential hiking tips, gear
                    recommendations, and the best trails to explore.
                  </p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    width={400}
                    height={225}
                    alt="Blog Post"
                    className="rounded-t-lg object-cover w-full aspect-video"
                  />
                </CardContent>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Sarah Lee</span> • 2 weeks ago
                  </div>
                  <h3 className="text-lg font-bold mt-2">
                    The Ultimate Guide to Sustainable Living
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Discover practical tips and strategies to live a more
                    environmentally-friendly lifestyle. From reducing waste to
                    adopting renewable energy, this guide will help you make a
                    positive impact.
                  </p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-muted py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Top Posts</h2>
              <Link
                to="#"
                className="text-primary hover:underline text-sm md:text-base"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    width={400}
                    height={225}
                    alt="Blog Post"
                    className="rounded-t-lg object-cover w-full aspect-video"
                  />
                </CardContent>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">John Doe</span> • 1 month
                      ago
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <EyeIcon className="w-4 h-4" />
                      <span>10k</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-2">
                    The Future of Artificial Intelligence: Opportunities and
                    Challenges
                  </h3>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    width={400}
                    height={225}
                    alt="Blog Post"
                    className="rounded-t-lg object-cover w-full aspect-video"
                  />
                </CardContent>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Jane Smith</span> • 2 months
                      ago
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <EyeIcon className="w-4 h-4" />
                      <span>8k</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-2">
                    The Art of Minimalist Living: Decluttering and Finding Joy
                  </h3>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    width={400}
                    height={225}
                    alt="Blog Post"
                    className="rounded-t-lg object-cover w-full aspect-video"
                  />
                </CardContent>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Sarah Lee</span> • 3 months
                      ago
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <EyeIcon className="w-4 h-4" />
                      <span>6k</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-2">
                    The Power of Positive Thinking: Transforming Your Mindset
                  </h3>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Top Writers</h2>
              <Link
                to="#"
                className="text-primary hover:underline text-sm md:text-base"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-muted-foreground text-sm">
                    Tech Enthusiast
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FilePenIcon className="w-4 h-4" />
                      <span>125 Posts</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UsersIcon className="w-4 h-4" />
                      <span>10k Followers</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Follow
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold">Jane Smith</h3>
                  <p className="text-muted-foreground text-sm">
                    Travel Blogger
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FilePenIcon className="w-4 h-4" />
                      <span>98 Posts</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UsersIcon className="w-4 h-4" />
                      <span>8k Followers</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Follow
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="Mike Johnson"
                    />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold">Mike Johnson</h3>
                  <p className="text-muted-foreground text-sm">Food Critic</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FilePenIcon className="w-4 h-4" />
                      <span>76 Posts</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UsersIcon className="w-4 h-4" />
                      <span>5k Followers</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Follow
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="Emily Chen" />
                    <AvatarFallback>EC</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-bold">Emily Chen</h3>
                  <p className="text-muted-foreground text-sm">Fitness Guru</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FilePenIcon className="w-4 h-4" />
                      <span>112 Posts</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UsersIcon className="w-4 h-4" />
                      <span>12k Followers</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2024 Blog App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
