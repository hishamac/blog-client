import Axios from "@/utils/Axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface PostTypeStore {
  isNull: boolean;
  setIsNull: (isNull: boolean) => void;
  isViewOpen: boolean;
  setIsViewOpen: (isViewOpen: boolean) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  isUpdateOpen: boolean;
  setIsUpdateOpen: (isUpdateOpen: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
  postType: {
    [x: string]: any;
  } | null;
  setPostType: (postType: { _id: string; name: string } | null) => void;
  postTypes: {
    [x: string]: any;
  }[];
  setPostTypes: (
    postTypes: {
      [x: string]: any;
    }[]
  ) => void;
  errorMessage: string;
  createPostType: (values: { [x: string]: any }) => void;
  getPostTypes: () => void;
  getPostType: (_id: string) => void;
  updatePostType: (_id: string, { name }: { name: string }) => void;
  deletePostType: (_id: string) => void;
  toView: {
    [x: string]: any;
  } | null;
  setToView: (toView: { [x: string]: any }) => void;
  toUpdate: {
    [x: string]: any;
  } | null;
  setToUpdate: (toUpdate: { [x: string]: any }) => void;
  toDelete: {
    [x: string]: any;
  } | null;
  setToDelete: (toDelete: { [x: string]: any }) => void;
}

export const usePostTypeStore = create<PostTypeStore>((set) => ({
  isNull: false,
  setIsNull: (isNull) => set({ isNull }),
  isViewOpen: false,
  setIsViewOpen: (isViewOpen) => set({ isViewOpen }),
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  isUpdateOpen: false,
  setIsUpdateOpen: (isUpdateOpen) => set({ isUpdateOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),
  postType: null,
  setPostType: (postType) => set({ postType }),
  toView: null,
  setToView: (toView) => set({ toView }),
  toUpdate: null,
  setToUpdate: (toUpdate) => set({ toUpdate }),
  toDelete: null,
  setToDelete: (toDelete) => set({ toDelete }),
  postTypes: [],
  setPostTypes: (postTypes) => set({ postTypes }),
  errorMessage: "",
  createPostType: async ({ name }) => {
    set({ isNull: false });
    set({ errorMessage: "" });
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
          set({ isNull: false });
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
    set({ isNull: false });
    set({ errorMessage: "" });
    Axios.get("/api/post-types")
      .then((response) => {
        if (response.status === 201) {
          set({ postTypes: response.data });
          set({ isNull: false });
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
    set({ isNull: false });
    set({ errorMessage: "" });
    Axios.get(`/api/post-types/${_id}`)
      .then((response) => {
        if (response.status === 201) {
          set({ postType: response.data });
          set({ isNull: false });
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
    set({ isNull: false });
    set({ errorMessage: "" });
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
          set({ isNull: false });
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
    set({ isNull: false });
    set({ errorMessage: "" });
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
          set((state) => ({ isNull: state.postTypes.length === 0 }));
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
