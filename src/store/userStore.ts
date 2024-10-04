import Axios from "@/utils/Axios";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import navigate from "@/utils/navigate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

interface UserStore {
  user: Object | null;
  setUser: (user: Object) => void;
  register: (
    email: string,
    name: string,
    password: string,
    profileFile: FileList | undefined
  ) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  errorMessage: string;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
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
  logout: () => set({ user: null }),
  errorMessage: "",
}));
