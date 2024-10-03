import Axios from "@/utils/Axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface LanguageStore {
  isCreateOpen: boolean;
  setIsCreateOpen: (isCreateOpen: boolean) => void;
  isUpdateOpen: boolean;
  setIsUpdateOpen: (isUpdateOpen: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isDeleteOpen: boolean) => void;
  language: {
    _id: string;
    name: string;
    direction: string;
  } | null;
  setLanguage: (language: {
    _id: string;
    name: string;
    direction: string;
  }) => void;
  languages: {
    _id: string;
    name: string;
    direction: string;
  }[];
  setLanguages: (
    languages: {
      _id: string;
      name: string;
      direction: string;
    }[]
  ) => void;
  errorMessage: string;
  createLanguage: (name: string, direction: string) => void;
  getLanguages: () => void;
  getLanguage: (_id: string) => void;
  updateLanguage: (
    _id: string,
    { name, direction }: { name: string; direction: string }
  ) => void;
  deleteLanguage: (_id: string) => void;
  toUpdate: {
    _id: string;
    name: string;
    direction: string;
  } | null;
  setToUpdate: (toUpdate: {
    _id: string;
    name: string;
    direction: string;
  }) => void;
  toDelete: {
    _id: string;
    name: string;
    direction: string;
  } | null;
  setToDelete: (toDelete: {
    _id: string;
    name: string;
    direction: string;
  }) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
  isUpdateOpen: false,
  setIsUpdateOpen: (isUpdateOpen) => set({ isUpdateOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isDeleteOpen) => set({ isDeleteOpen }),
  language: null,
  setLanguage: (language) => set({ language }),
  toUpdate: null,
  setToUpdate: (toUpdate) => set({ toUpdate }),
  toDelete: null,
  setToDelete: (toDelete) => set({ toDelete }),
  languages: [],
  setLanguages: (languages) => set({ languages }),
  errorMessage: "",
  createLanguage: async (name, direction) => {
    const loadingToast = toast.loading("Creating Language...");
    await Axios.post(
      "/api/languages",
      { name, direction },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Language Created Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            languages: state.languages.concat({ ...response.data }),
          }));
          set({ isCreateOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Creating Language",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Creating Language", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error?.message || "Error Happened While Creating Language",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  },
  getLanguages: async () => {
    Axios.get("/api/languages")
      .then((response) => {
        if (response.status === 201) {
          set({ languages: response.data });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message ||
              "Error Happened While Fetching Languages",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching Languages" });
        }
      })
      .catch((error) => {
        set({
          errorMessage:
            error?.message || "Error Happened While Fetching Languages",
        });
      });
  },
  getLanguage: async (_id) => {
    Axios.get(`/api/languages/${_id}`)
      .then((response) => {
        if (response.status === 201) {
          set({ language: response.data });
        } else if (response.status === 200) {
          set({
            errorMessage:
              response.data?.message ||
              "Error Happened While Fetching Language",
          });
        } else {
          set({ errorMessage: "Error Happened While Fetching Language" });
        }
      })
      .catch((error) => {
        set({
          errorMessage:
            error?.message || "Error Happened While Fetching Language",
        });
      });
  },
  updateLanguage: async (_id, { name, direction }) => {
    const loadingToast = toast.loading("Updating Language...");
    await Axios.put(
      `/api/languages/${_id}`,
      { name, direction },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Language Updated Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            languages: state.languages.map((language) =>
              language._id === _id ? { _id, name, direction } : language
            ),
          }));
          set({ isUpdateOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Updating Language",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Updating Language", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error?.message || "Error Happened While Updating Language",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  },
  deleteLanguage: async (_id) => {
    const loadingToast = toast.loading("Deleting Language...");
    await Axios.delete(`/api/languages/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Language Deleted Successfully", {
            id: loadingToast,
            duration: 3000,
          });
          set((state) => ({
            languages: state.languages.filter(
              (language) => language._id !== _id
            ),
          }));
          set({ isDeleteOpen: false });
        } else if (response.status === 200) {
          toast.error(
            response.data?.message || "Error Happened While Deleting Language",
            {
              id: loadingToast,
              duration: 3000,
            }
          );
        } else {
          toast.error("Error Happened While Deleting Language", {
            id: loadingToast,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error(
          error?.message || "Error Happened While Deleting Language",
          {
            id: loadingToast,
            duration: 3000,
          }
        );
      });
  },
}));
