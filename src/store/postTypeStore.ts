import Axios from "@/utils/Axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface PostTypeStore {
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  isUpdateOpen: boolean;
  setIsUpdateOpen: (isUpdateOpen: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
  postType: {
    _id: string;
    name: string;
  } | null;
  setPostType: (postType: { _id: string; name: string }) => void;
  postTypes: {
    _id: string;
    name: string;
  }[];
  setPostTypes: (
    postTypes: {
      _id: string;
      name: string;
    }[]
  ) => void;
  errorMessage: string;
  createPostType: (name: string) => void;
  getPostTypes: () => void;
  getPostType: (_id: string) => void;
  updatePostType: (_id: string, { name }: { name: string }) => void;
  deletePostType: (_id: string) => void;
  toUpdate: {
    _id: string;
    name: string;
  } | null;
  setToUpdate: (toUpdate: { _id: string; name: string }) => void;
  toDelete: {
    _id: string;
    name: string;
  } | null;
  setToDelete: (toDelete: { _id: string; name: string }) => void;
}

export const usePostTypeStore = create<PostTypeStore>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  isUpdateOpen: false,
  setIsUpdateOpen: (isUpdateOpen) => set({ isUpdateOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),
  postType: null,
  setPostType: (postType) => set({ postType }),
  toUpdate: null,
  setToUpdate: (toUpdate) => set({ toUpdate }),
  toDelete: null,
  setToDelete: (toDelete) => set({ toDelete }),
  postTypes: [],
  setPostTypes: (postTypes) => set({ postTypes }),
  errorMessage: "",
  createPostType: async (name) => {
    const loadingToast = toast.loading("Creating Post Type...");
    await Axios.post(
      "/api/post-types",
      { name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Post Type Created Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            postTypes: state.postTypes.concat({ ...response.data }),
          }));
          set({ isCreateOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Creating Post Type",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Creating Post Type", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error?.message || "Error Happened While Creating Post Type",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  },
  getPostTypes: async () => {
    Axios.get("/api/post-types")
      .then((response) => {
        if (response.status === 201) {
          set({ postTypes: response.data });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message ||
              "Error Happened While Fetching Post Types",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching Post Types" });
        }
      })
      .catch((error) => {
        set({
          errorMessage:
            error?.message || "Error Happened While Fetching Post Types",
        });
      });
  },
  getPostType: async (_id) => {
    Axios.get(`/api/post-types/${_id}`)
      .then((response) => {
        if (response.status === 201) {
          set({ postType: response.data });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message ||
              "Error Happened While Fetching Post Type",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching Post Type" });
        }
      })
      .catch((error) => {
        set({
          errorMessage:
            error?.message || "Error Happened While Fetching Post Type",
        });
      });
  },
  updatePostType: async (_id, { name }) => {
    const loadingToast = toast.loading("Updating Post Type...");
    await Axios.put(
      `/api/post-types/${_id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Post Type Updated Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            postTypes: state.postTypes.map((postType) =>
              postType._id === _id ? { _id, name } : postType
            ),
          }));
          set({ isUpdateOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Updating Post Type",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Updating Post Type", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error?.message || "Error Happened While Updating Post Type",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  },
  deletePostType: async (_id) => {
    const loadingToast = toast.loading("Deleting Post Type...");
    await Axios.delete(`/api/post-types/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Post Type Deleted Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            postTypes: state.postTypes.filter(
              (postType) => postType._id !== _id
            ),
          }));
          set({ isDeleteOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Deleting Post Type",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Deleting Post Type", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error?.message || "Error Happened While Deleting Post Type",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  },
}));
