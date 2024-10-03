import Axios from "@/utils/Axios";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import toast from "react-hot-toast";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface Post {
  _id: string;
  author: string;
  likes: number;
  comments: [];
  title: string;
  description: string;
  content: string;
  type: string;
  collaborators: [];
  imageUrl: string;
  status: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PostStore {
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  isUpdateOpen: boolean;
  setIsUpdateOpen: (isUpdateOpen: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
  post: Post | null;
  setPost: (post: Post) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  errorMessage: string;
  createPost: (postData: {
    title: string;
    description: string;
    content: string;
    type: string;
    status: string;
    imageUrl: FileList;
    isActive: boolean;
    author: string;
  }) => void;
  getPosts: () => void;
  getPost: (_id: string) => void;
  updatePost: (
    _id: string,
    postData: {
      _id: string;
      title: string;
      description: string;
      content: string;
      type: string;
      status: string;
      imageUrl: FileList;
      isActive: boolean;
      author: string;
    }
  ) => void;
  deletePost: (_id: string) => void;
  toUpdate: Post | null;
  setToUpdate: (toUpdate: Post) => void;
  toDelete: Post | null;
  setToDelete: (toDelete: Post) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  isUpdateOpen: false,
  setIsUpdateOpen: (isUpdateOpen) => set({ isUpdateOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),
  post: null,
  setPost: (post) => set({ post }),
  toUpdate: null,
  setToUpdate: (toUpdate) => set({ toUpdate }),
  toDelete: null,
  setToDelete: (toDelete) => set({ toDelete }),
  posts: [],
  setPosts: (posts) => set({ posts }),
  errorMessage: "",
  createPost: async (postData: {
    title: string;
    description: string;
    content: string;
    type: string;
    status: string;
    imageUrl: FileList;
    isActive: boolean;
    author: string;
  }) => {
    const loadingToast = toast.loading("Creating Post...");

    const imageUrl = await uploadImageToCloudinary(postData.imageUrl[0]);
    const decodedToken: any = jwtDecode(localStorage.getItem("user") as string);
    await Axios.post(
      "/api/posts",
      {
        title: postData.title,
        description: postData.description,
        content: postData.content,
        type: postData.type,
        status: postData.status,
        imageUrl,
        isActive: postData.isActive,
        author: decodedToken?.id as string,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Post Created Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            posts: [...state.posts, response.data],
          }));
          set({ isCreateOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Creating Post",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Creating Post", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Error Happened While Creating Post", {
          id: loadingToast,
          duration: 3000,
        });
      });
  },
  getPosts: async () => {
    Axios.get("/api/posts")
      .then((response) => {
        if (response.status === 201) {
          set({ posts: response.data });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message || "Error Happened While Fetching Posts",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching Posts" });
        }
      })
      .catch((error) => {
        set({
          errorMessage: error?.message || "Error Happened While Fetching Posts",
        });
      });
  },
  getPost: async (_id) => {
    Axios.get(`/api/posts/${_id}`)
      .then((response) => {
        if (response.status === 201) {
          set({ post: response.data });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message || "Error Happened While Fetching Post",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching Post" });
        }
      })
      .catch((error) => {
        set({
          errorMessage: error?.message || "Error Happened While Fetching Post",
        });
      });
  },
  updatePost: async (
    _id: string,
    postData: {
      title: string;
      description: string;
      content: string;
      type: string;
      status: string;
      imageUrl: FileList;
      isActive: boolean;
      author: string;
    }
  ) => {
    const loadingToast = toast.loading("Updating Post...");
    let imageUrl;
    if (postData.imageUrl.length > 0) {
      imageUrl = await uploadImageToCloudinary(postData.imageUrl[0]);
    }
    await Axios.put(
      `/api/posts/${_id}`,
      {
        title: postData.title,
        description: postData.description,
        content: postData.content,
        type: postData.type,
        status: postData.status,
        imageUrl,
        isActive: postData.isActive,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Post Updated Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            posts: state.posts.map((post) =>
              post._id === _id ? { ...post, ...response.data } : post
            ),
          }));
          set({ isUpdateOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Updating Post",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Updating Post", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Error Happened While Updating Post", {
          id: loadingToast,
          duration: 3000,
        });
      });
  },
  deletePost: async (_id) => {
    const loadingToast = toast.loading("Deleting Post...");
    await Axios.delete(`/api/posts/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Post Deleted Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            posts: state.posts.filter((post) => post._id !== _id),
          }));
          set({ isDeleteOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Deleting Post",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Deleting Post", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Error Happened While Deleting Post", {
          id: loadingToast,
          duration: 3000,
        });
      });
  },
}));
