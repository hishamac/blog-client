import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MoreVerticalIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { formatDate } from "@/utils/formatDate";
import { z } from "zod";
import { usePostTypeStore } from "@/store/postTypeStore";
import Create from "../crud/Create";
import Update from "../crud/Update";
import PostDetail from "../PostDetail";
import Delete from "../crud/Delete";
import { Skeleton } from "@/components/ui/skeleton";

export default function Post() {
  const {
    posts,
    createPost,
    getPosts,
    updatePost,
    deletePost,
    isViewOpen,
    setIsViewOpen,
    isCreateOpen,
    setIsCreateOpen,
    isUpdateOpen,
    setIsUpdateOpen,
    toView,
    setToView,
    toUpdate,
    setToUpdate,
    toDelete,
    setToDelete,
    isDeleteOpen,
    setIsDeleteOpen,
    errorMessage,
    isNull,
  } = usePostStore();

  const { getPostTypes, postTypes } = usePostTypeStore();

  useEffect(() => {
    if (posts.length === 0) {
      getPosts();
    }
    if (postTypes.length === 0) {
      getPostTypes();
    }
  }, []);

  const inputs = [
    { name: "title", viewName: "Title", type: "text" },
    { name: "description", viewName: "Description", type: "text" },
    { name: "content", viewName: "Content", type: "rte" },
    {
      name: "type",
      viewName: "Type",
      type: "select",
      options: postTypes.map((postType) => {
        return {
          name: `${postType?.name}`,
          value: `${postType?._id}`,
        };
      }),
    }, // You might want to fetch these from your backend
    {
      name: "status",
      viewName: "Status",
      type: "select",
      options: [
        { name: "Draft", value: "draft" },
        { name: "Published", value: "published" },
        { name: "Archived", value: "archived" },
      ],
    },
    { name: "imageUrl", viewName: "Image", type: "file" },
    { name: "isActive", viewName: "Is Active", type: "checkbox" },
  ];

  const createFormSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." }),
    content: z
      .string()
      .min(20, { message: "Content must be at least 20 characters." }),
    type: z.string().min(1, { message: "Type is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    imageUrl: z.instanceof(FileList, { message: "Image is required" }),
    isActive: z.boolean().optional(),
  });

  const updateFormSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." }),
    content: z
      .string()
      .min(20, { message: "Content must be at least 20 characters." }),
    type: z.string().min(1, { message: "Type is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    imageUrl: z.instanceof(FileList).optional(),
    isActive: z.boolean().optional(),
  });

  return (
    <>
      {posts.length === 0 && errorMessage === "" && isNull === false && (
        <div className="container mx-auto px-4 py-8">
          <div className="p-2 w-full flex justify-end">
            <Skeleton className="h-10 w-28" />
          </div>
          <div className="grid gap-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
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

      {posts.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="p-2 w-full flex justify-end">
            <Button onClick={() => setIsCreateOpen(true)}>Create Post</Button>
          </div>
          <div className="grid gap-4">
            {posts?.map((post) => (
              <Card key={post._id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      Status: {post.status} | Date: {formatDate(post.createdAt)}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setIsViewOpen(true);
                          setToView(post);
                        }}
                      >
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsUpdateOpen(true);
                          setToUpdate(post);
                        }}
                      >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsDeleteOpen(true);
                          setToDelete(post);
                        }}
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      <Create
        formSchema={createFormSchema}
        createItem={createPost}
        inputs={inputs}
        title="Post"
        open={isCreateOpen}
        setOpen={setIsCreateOpen}
        fileRefValue="imageUrl"
      />
      <Update
        formSchema={updateFormSchema}
        updateItem={updatePost}
        inputs={inputs}
        title="Post"
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        itemToUpdate={toUpdate}
        fileRefValue="imageUrl"
      />
      <>
        {isViewOpen && (
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh]  flex flex-col rounded-lg overflow-auto">
              <PostDetail id={toView?._id as string} />
            </DialogContent>
          </Dialog>
        )}
      </>
      <Delete
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemToDelete={toDelete}
        title="Post"
        deleteItem={deletePost}
      />
    </>
  );
}
