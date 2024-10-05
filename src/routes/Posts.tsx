"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostStore } from "@/store/postStore";
import { formatDate } from "@/utils/formatDate";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Mock data for posts
// const posts = [
//   {
//     id: 1,
//     title: "The Future of Artificial Intelligence",
//     description: "Explore the latest advancements in AI and how they're shaping our world. From machine learning to neural networks, discover the technologies driving the AI revolution.",
//     image: "/placeholder.svg",
//     author: "John Doe",
//     date: "2024-03-15",
//   },
//   {
//     id: 2,
//     title: "Sustainable Living: Small Changes, Big Impact",
//     description: "Learn how small lifestyle adjustments can lead to a more sustainable future. This post covers everything from reducing plastic use to adopting energy-efficient practices at home.",
//     image: "/placeholder.svg",
//     author: "Jane Smith",
//     date: "2024-03-10",
//   },
//   {
//     id: 3,
//     title: "The Art of Mindfulness in a Digital Age",
//     description: "Discover techniques for staying present and focused in an increasingly digital world. This guide offers practical mindfulness exercises tailored for the modern lifestyle.",
//     image: "/placeholder.svg",
//     author: "Alex Johnson",
//     date: "2024-03-05",
//   },
//   {
//     id: 4,
//     title: "Exploring World Cuisines: A Culinary Journey",
//     description: "Embark on a global food adventure from the comfort of your kitchen. This post features recipes and stories from diverse culinary traditions around the world.",
//     image: "/placeholder.svg",
//     author: "Maria Garcia",
//     date: "2024-02-28",
//   },
//   {
//     id: 5,
//     title: "The Rise of Remote Work: Challenges and Opportunities",
//     description: "Analyze the shift towards remote work, its impact on businesses and employees, and strategies for thriving in a distributed work environment.",
//     image: "/placeholder.svg",
//     author: "Chris Lee",
//     date: "2024-02-20",
//   },
//   {
//     id: 6,
//     title: "Fitness Trends: What's New in 2024",
//     description: "Stay up-to-date with the latest fitness trends, from high-tech home workouts to innovative group exercise classes. Find the perfect routine to meet your health goals.",
//     image: "/placeholder.svg",
//     author: "Emma Wilson",
//     date: "2024-02-15",
//   },
// ]

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState("");

  const { getPosts, posts, isNull, errorMessage } = usePostStore();

  useEffect(() => {
    if (posts.length === 0) {
      getPosts();
    }
  }, [posts]);

  // Function to truncate description
  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  // Filter posts based on search term
  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {posts.length === 0 && errorMessage === "" && isNull === false && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                  <div className="p-4 flex flex-col flex-grow">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isNull && (
          <div className="text-center text-muted-foreground font-semibold py-4">
            No posts found.
          </div>
        )}

        {errorMessage && <div>{errorMessage}</div>}

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts?.map((post) => (
              <Card key={post._id} className="flex flex-col h-full">
                <CardContent className="p-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {truncateDescription(post.description, 100)}
                    </p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{post.author.name}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <Button asChild className="mt-4">
                      <Link to={`/posts/${post._id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
