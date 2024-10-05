import Axios from "@/utils/Axios";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserStore {
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
  user: {
    [x: string]: any;
  } | null;
  setUser: (user: { _id: string; name: string } | null) => void;
  users: {
    [x: string]: any;
  }[];
  setUsers: (
    users: {
      [x: string]: any;
    }[]
  ) => void;
  errorMessage: string;
  register: (
    email: string,
    name: string,
    password: string,
    profileFile: FileList | undefined
  ) => void;
  login: (email: string, password: string) => void;
  getUsers: () => void;
  getUser: (_id: string) => void;
  updateUser: (_id: string, values: { [x: string]: any }) => void;
  deleteUser: (_id: string) => void;
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

export const useUserStore = create<UserStore>((set) => ({
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
  user: null,
  setUser: (user) => set({ user }),
  toView: null,
  setToView: (toView) => set({ toView }),
  toUpdate: null,
  setToUpdate: (toUpdate) => set({ toUpdate }),
  toDelete: null,
  setToDelete: (toDelete) => set({ toDelete }),
  users: [],
  setUsers: (users) => set({ users }),
  errorMessage: "",
  register: async (email, name, password, profileFile) => {
    const loadingToast = toast.loading("Registering...");
    let profilePicture = "";

    console.log(profileFile);

    if (profileFile && profileFile.length > 0) {
      profilePicture = await uploadImageToCloudinary(profileFile[0]);
    }

    await Axios.post("/api/users/register", {
      email,
      name,
      password,
      profilePicture,
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          set({ user: response.data });
          console.log(response.data);
          toast.success("Registered Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          localStorage.setItem("user", response.data?.token);
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Registering",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Registering", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Error Happened While Registering", {
          id: loadingToast,
          duration: 3000,
        });
      });
  },
  login: async (email, password) => {
    const loadingToast = toast.loading("Logging In...");

    await Axios.post("/api/users/login", { email, password })
      .then((response) => {
        if (response.status === 201) {
          set({ user: response.data });
          toast.success("Logged In Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          localStorage.setItem("user", response.data?.token);
          console.log(response.data);
          console.log(localStorage.getItem("user"));
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Logging In",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Logging In", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Error Happened While Logging In", {
          id: loadingToast,
          duration: 3000,
        });
      });
  },
  getUsers: async () => {
    set({ isNull: false });
    set({ errorMessage: "" });
    Axios.get("/api/users")
      .then((response) => {
        if (response.status === 201) {
          set({ users: response.data });
          set({ isNull: false });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message || "Error Happened While Fetching Users",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching Users" });
        }
      })
      .catch((error) => {
        set({
          errorMessage: error?.message || "Error Happened While Fetching Users",
        });
      });
  },
  getUser: async (_id) => {
    set({ isNull: false });
    set({ errorMessage: "" });
    Axios.get(`/api/users/${_id}`)
      .then((response) => {
        if (response.status === 201) {
          set({ user: response.data });
          set({ isNull: false });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message || "Error Happened While Fetching User",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching User" });
        }
      })
      .catch((error) => {
        set({
          errorMessage: error?.message || "Error Happened While Fetching User",
        });
      });
  },
  updateUser: async (_id, { name, email, password, profileFile }) => {
    set({ isNull: false });
    set({ errorMessage: "" });
    const loadingToast = toast.loading("Updating User...");

    let profilePicture = "";

    console.log(profileFile);

    if (profileFile && profileFile.length > 0) {
      profilePicture = await uploadImageToCloudinary(profileFile[0]);
    }

    await Axios.put(
      `/api/users/${_id}`,
      { name, email, password, profileFile },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("User Updated Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            users: state.users.map((user) =>
              user._id === _id ? response.data : user
            ),
          }));
          set({ isUpdateOpen: false });
          set({ isNull: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Updating User",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Updating User", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Error Happened While Updating User", {
          id: loadingToast,
          duration: 3000,
        });
      });
  },
  deleteUser: async (_id) => {
    set({ isNull: false });
    set({ errorMessage: "" });
    const loadingToast = toast.loading("Deleting User...");
    await Axios.delete(`/api/users/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("User Deleted Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            users: state.users.filter((user) => user._id !== _id),
          }));
          set({ isDeleteOpen: false });
          set((state) => ({ isNull: state.users.length === 0 }));
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Deleting User",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Deleting User", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Error Happened While Deleting User", {
          id: loadingToast,
          duration: 3000,
        });
      });
  },
}));
