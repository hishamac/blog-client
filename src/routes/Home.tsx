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
import { usePostStore } from "@/store/postStore";
import {
  ArrowRightIcon,
  FilePenIcon,
  UsersIcon
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Home() {
  const { posts, getPosts } = usePostStore();

  useEffect(() => {
    if (posts.length === 0) {
      getPosts();
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-6 md:py-12">
          <div className="container mx-auto px-4">
            <Carousel className="max-w-[800px] mx-auto relative">
              <CarouselContent>
                {posts.map((post) => (
                  <CarouselItem>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="space-y-2 md:space-y-4 md:w-full">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">
                            {post.author.name}
                          </span>{" "}
                          • 2 days ago
                        </div>
                        <h2 className="text-lg md:text-2xl font-bold">
                          {post.title}{" "}
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base line-clamp-3 md:line-clamp-none">
                          {post.description}
                        </p>
                        <Link
                          to={`/posts/${post._id}`}
                          className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                        >
                          Read More
                          <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
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
                to="/posts"
                className="text-primary hover:underline text-sm md:text-base"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <Card>
                  <div className="p-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{post.author.name}</span> •
                      3 days ago
                    </div>
                    <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {post.description}
                    </p>
                    <Link
                      to={`/posts/${post._id}`}
                      className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                    >
                      Read More
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-muted py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Top Posts</h2>
              <Link
                to="/posts"
                className="text-primary hover:underline text-sm md:text-base"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(4, 7).map((post) => (
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{post.author.name}</span>{" "}
                        • 1 day ago
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                    <Link
                      to={`/posts/${post._id}`}
                      className="inline-flex items-center gap-2 font-medium text-primary hover:underline mt-4"
                    >
                      Read More
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              ))}
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
