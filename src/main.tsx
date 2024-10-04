import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { Toaster } from "react-hot-toast";
import Language from "./routes/Language";
import PostType from "./routes/PostType";
import Post from "./routes/Post";
import PostDetail from "./routes/PostDetail";
import AdminProtected from "./routes/protected/Admin";
import BloggerProtected from "./routes/protected/Blogger";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: (
      <>
        <Outlet />
        <ModeToggle className="absolute bottom-5 left-3" />
      </>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <BloggerProtected />,
        children: [
          {
            path: "/p",
            element: (
              <>
                <Outlet />
                <ModeToggle className="absolute bottom-5 left-3" />
              </>
            ),
            children: [
              {
                index: true,
                element: <div>HEllo</div>,
              },
              {
                path: "post",
                element: <Post />,
              },
              {
                element: <AdminProtected />,
                children: [
                  {
                    path: "language",
                    element: <Language />,
                  },
                  {
                    path: "post-type",
                    element: <PostType />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster />
    <RouterProvider router={router} />
  </ThemeProvider>
);
