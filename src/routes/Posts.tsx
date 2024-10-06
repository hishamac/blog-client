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

interface PostsProps {
  typeId?: string;
  authorId?: string;
}

export default function Posts({ typeId, authorId }: PostsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    getPosts,
    getPostsByAuthor,
    getPostsByType,
    posts,
    isNull,
    errorMessage,
  } = usePostStore();

  useEffect(() => {
    if (typeId) {
      getPostsByType(typeId);
    } else if (authorId) {
      getPostsByAuthor(authorId);
    } else {
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
  );
}
