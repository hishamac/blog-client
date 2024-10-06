import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/userStore";
import navigate from "@/utils/navigate";
import { jwtDecode } from "jwt-decode";
import { EyeIcon, FilePenIcon, SearchIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Bloggers() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    users,
    getUsers,
    isNull,
    errorMessage,
    followUser,
    unFollowUser,
  } = useUserStore();

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bloggers</h1>

      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="search"
            placeholder="Search bloggers..."
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {users.length === 0 && errorMessage === "" && isNull === false && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-4">
              <div className="p-4 flex flex-col items-center">
                {/* Avatar skeleton */}
                <Skeleton className="w-16 h-16 rounded-full mb-4" />

                {/* Name skeleton */}
                <Skeleton className="w-24 h-4 mb-2" />

                {/* Subtitle skeleton */}
                <Skeleton className="w-32 h-3 mb-4" />

                <div className="flex items-center gap-4 mt-4">
                  {/* Posts count skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>

                  {/* Followers count skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                </div>

                {/* Buttons skeleton */}
                <div className="flex w-full gap-2 mt-4">
                  <Skeleton className="w-2/3 h-10 rounded-md" />
                  <Skeleton className="w-1/3 h-10 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isNull && (
        <div className="text-center text-muted-foreground font-semibold py-4">
          No posts found.
        </div>
      )}

      {errorMessage && <div>{errorMessage}</div>}

      {users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((usr) => (
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage src="/placeholder-usr.jpg" alt={`${usr.name}`} />
                  <AvatarFallback>
                    {usr.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{usr.name}</h3>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FilePenIcon className="w-4 h-4" />
                    <span>{usr.posts.length} Posts</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UsersIcon className="w-4 h-4" />
                    <span>{usr.followers.length} Followers</span>
                  </div>
                </div>
                <div className=" flex w-full gap-2">
                  {localStorage.getItem("user") ? (
                    <>
                      {usr.followers.includes(
                        (
                          jwtDecode(
                            localStorage.getItem("user") as string
                          ) as any
                        ).id
                      ) ? (
                        <Button
                          variant={"secondary"}
                          className="mt-4 w-2/3"
                          onClick={() => {
                            unFollowUser(usr._id);
                          }}
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          className="mt-4 w-2/3"
                          onClick={() => {
                            followUser(usr._id);
                          }}
                        >
                          Follow
                        </Button>
                      )}
                    </>
                  ) : (
                    <Link to="/login">
                      <Button className="mt-4 w-2/3">Follow</Button>
                    </Link>
                  )}

                  <Button
                    variant="outline"
                    className="mt-4 w-1/3"
                    onClick={() => {
                      navigate(`/bloggers/${usr._id}`);
                    }}
                  >
                    <Link to={`/bloggers/${usr._id}`}>
                      <EyeIcon className="w-4 h-4" />
                    </Link>
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
