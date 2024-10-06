import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/userStore";
import {
  Users
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Helper function to truncate description
const truncateDescription = (description: string, maxLength: number) => {
  if (description.length <= maxLength) return description;
  return description.substr(0, maxLength) + "...";
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface BloggerDetailProps {
  id?: string;
}

export default function BloggerDetail({ id }: BloggerDetailProps) {
  const { _id } = useParams();

  const { user, getUser, errorMessage, isNull } = useUserStore();

  useEffect(() => {
    if (id) {
      getUser(id);
    } else {
      getUser(_id as string);
    }
  }, []);
  // Mock data for the blogger
  const blogger = user;

  return (
    <>
      {user === null && errorMessage === "" && isNull === false && (
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto mb-8 p-2">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="text-center sm:text-left">
                <Skeleton className="h-8 w-48" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
            <Skeleton className="h-10 w-full mt-4" />
          </Card>

          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="flex flex-col h-full">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                  <div className="p-4 flex flex-col flex-grow">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isNull && (
        <div className="text-center text-muted-foreground font-semibold py-4">
          No Posts Found
        </div>
      )}

      {errorMessage && <div>{errorMessage}</div>}

      {user !== null && (
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto mb-8 p-2">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt={blogger?.name as string}
                />
                <AvatarFallback>
                  {blogger?.name
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl">{blogger?.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">
                    {blogger?.followers.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {blogger?.following.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogger?.posts.length}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
              </div>
            </CardContent>
            <Button className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Follow
            </Button>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogger?.posts.map((post: any) => (
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
        </div>
      )}
    </>
  );
}
