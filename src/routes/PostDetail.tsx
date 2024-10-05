import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  MessageSquareIcon,
  ShareIcon,
} from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { formatDate } from "@/utils/formatDate";
import { Skeleton } from "@/components/ui/skeleton";

interface PostDetailProps {
  id?: string;
}

export default function PostDetail({ id }: PostDetailProps) {
  const {
    post,
    getPost,
    posts,
    getPosts,
    isNull,
    errorMessage,
    setPost,
    setIsNull,
  } = usePostStore();
  const { _id } = useParams();

  useEffect(() => {
    if (id) {
      getPost(id);
    } else {
      getPost(_id as string);
    }
    if (posts.length === 0) {
      getPosts();
    }
  }, [_id]);

  return (
    <>
      {post === null && errorMessage === "" && isNull === false && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="w-full h-96 mb-4" />
              <div className="flex items-center mt-3">
                <Skeleton className="h-10 w-10 rounded-full mr-2" />
                <Skeleton className="h-4 w-32 mr-2" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="flex items-center mb-6 gap-4 mt-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-center justify-between border-t border-b py-4 mb-6">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>

            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="cursor-pointer">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <Skeleton className="w-20 h-20 rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isNull && (
        <div className="text-center text-muted-foreground font-semibold py-4">
          No Posts Found
        </div>
      )}

      {errorMessage && <div>{errorMessage}</div>}

      {post !== null && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
              <div className="w-full max-h-96 object-cover overflow-auto">
                <img className="w-full " src={`${post?.imageUrl}`} />
              </div>
              <div className="flex items-center mt-3">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage
                    src={post?.author?.imageUrl}
                    alt={post?.author?.name}
                  />
                  <AvatarFallback>
                    {post?.author?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold mr-2">{post?.author?.name}</p>
                <Button variant={`secondary`}>Follow</Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-6 gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className=" h-4 w-4" />
                  <span>{formatDate(post?.createdAt as Date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className=" h-4 w-4" />
                  <span>5 Minutes</span>
                </div>
              </div>

              <div
                className="prose max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: post?.content as string }}
              />

              <div className="flex items-center justify-between border-t border-b py-4 mb-6">
                <Button variant="ghost">
                  <HeartIcon className="mr-2 h-5 w-5" />
                  {post?.likes} Likes
                </Button>
                <Button variant="ghost">
                  <MessageSquareIcon className="mr-2 h-5 w-5" />
                  {post?.comments} Comments
                </Button>
                <Button variant="ghost">
                  <ShareIcon className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Trending Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts?.map((post) => (
                  <Link
                    to={`/posts/${post._id}`}
                    key={post._id}
                    onClick={() => {
                      setPost(null);
                      setIsNull(false);
                    }}
                  >
                    <Card key={post?._id} className="cursor-pointer ">
                      <CardContent className="p-4 flex items-center space-x-4">
                        <img
                          src={post?.imageUrl}
                          alt={post?.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{post?.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {post?.author?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(post?.createdAt)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
