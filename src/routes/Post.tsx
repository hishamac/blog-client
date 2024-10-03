import React, { useEffect } from "react";
import { usePostStore } from "@/store/postStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import Create from "./crud/Create";
import Update from "./crud/Update";
import { usePostTypeStore } from "@/store/postTypeStore";

export default function Post() {
  const {
    posts,
    createPost,
    getPosts,
    updatePost,
    deletePost,
    isCreateOpen,
    setIsCreateOpen,
    isUpdateOpen,
    setIsUpdateOpen,
    toUpdate,
    setToUpdate,
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
    { name: "content", viewName: "Content", type: "textarea" },
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
      <Button onClick={() => setIsCreateOpen(true)}>Create Post</Button>
      <div className="grid grid-cols-3 gap-4">
        {posts?.map((post) => (
          <Card key={post?._id}>
            <CardContent>
              <h3 className="font-bold">{post?.title}</h3>
              <p>{post?.description}</p>
              <p>Status: {post?.status}</p>
              <p>Type: {post?.type}</p>
              {post?.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setToUpdate(post);
                  setIsUpdateOpen(true);
                }}
              >
                Edit
              </Button>
              <Button onClick={() => deletePost(post?._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
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
    </>
  );
}
