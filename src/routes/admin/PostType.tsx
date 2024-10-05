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
import Posts from "../Posts";

export default function PostType() {
  const {
    postTypes,
    createPostType,
    getPostTypes,
    updatePostType,
    deletePostType,
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
  } = usePostTypeStore();

  const { posts, getPosts } = usePostStore();

  useEffect(() => {
    if (posts.length === 0) {
      getPosts();
    }
    if (postTypes.length === 0) {
      getPostTypes();
    }
  }, []);

  const createFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
  });

  const createInputs = [
    {
      name: "name",
      viewName: "Name",
      type: "text",
    },
  ];

  const updateFormSchema = createFormSchema;

  const updateInputs = [
    {
      name: "name",
      viewName: "Name",
      type: "text",
      value: toUpdate?.name,
    },
  ];

  return (
    <>
      {postTypes.length === 0 && errorMessage === "" && isNull === false && (
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

      {postTypes.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="p-2 w-full flex justify-end">
            <Button onClick={() => setIsCreateOpen(true)}>
              Create Post Type
            </Button>
          </div>
          <div className="grid gap-4">
            {postTypes?.map((postType) => (
              <Card key={postType._id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{postType.name}</h2>
                    <p className="text-sm">
                      Posts Count: {postType.posts?.length} | Date:{" "}
                      {formatDate(postType.createdAt)}
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
                          setToView(postType);
                        }}
                      >
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsUpdateOpen(true);
                          setToUpdate(postType);
                        }}
                      >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsDeleteOpen(true);
                          setToDelete(postType);
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
        createItem={createPostType}
        inputs={createInputs}
        title="Post Type"
        open={isCreateOpen}
        setOpen={setIsCreateOpen}
        fileRefValue="imageUrl"
      />
      <Update
        formSchema={updateFormSchema}
        updateItem={updatePostType}
        inputs={updateInputs}
        title="Post Type"
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        itemToUpdate={toUpdate}
        fileRefValue="imageUrl"
      />
      <>
        {isViewOpen && (
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh]  flex flex-col rounded-lg overflow-auto">
              <Posts />
            </DialogContent>
          </Dialog>
        )}
      </>
      <Delete
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemToDelete={toDelete}
        title="Post"
        deleteItem={deletePostType}
      />
    </>
  );
}
