import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import Create from "./crud/Create";
import { usePostTypeStore } from "@/store/postTypeStore";
import { useEffect } from "react";
import Update from "./crud/Update";

export default function PostType() {
  const {
    postTypes,
    setPostTypes,
    createPostType,
    getPostTypes,
    getPostType,
    updatePostType,
    deletePostType,
    postType,
    setPostType,
    isCreateOpen,
    setIsCreateOpen,
    isUpdateOpen,
    setIsUpdateOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    errorMessage,
    toUpdate,
    setToUpdate,
    toDelete,
    setToDelete,
  } = usePostTypeStore();

  useEffect(() => {
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

  const updateFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
  });

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
      <button onClick={() => setIsCreateOpen(true)}>Create Post Type</button>
      <div className="grid grid-cols-3 gap-4">
        {postTypes?.map((postType) => (
          <Card key={postType?._id}>
            <CardContent>
              <div className="flex justify-between">
                <div>{postType?.name}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setToUpdate(postType);
                  setIsUpdateOpen(true);
                }}
              >
                Edit
              </Button>
              <Button onClick={() => deletePostType(postType?._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Create
        formSchema={createFormSchema}
        createItem={createPostType}
        inputs={createInputs}
        title="Post Type"
        open={isCreateOpen}
        setOpen={setIsCreateOpen}
      />
      <Update
        formSchema={updateFormSchema}
        updateItem={updatePostType}
        inputs={updateInputs}
        title="Post Type"
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        itemToUpdate={toUpdate}
      />
    </>
  );
}