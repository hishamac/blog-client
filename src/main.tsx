import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { Toaster } from "react-hot-toast";
import Language from "./routes/admin/Language";
import PostType from "./routes/admin/PostType";
import Post from "./routes/admin/Post";
import PostDetail from "./routes/PostDetail";
import AdminProtected from "./routes/protected/Admin";
import BloggerProtected from "./routes/protected/Blogger";
import Home from "./routes/Home";
import Posts from "./routes/Posts";
import User from "./routes/admin/User";
import HeaderUser from "./routes/Header";
import Header from "./routes/admin/Header";
import Bloggers from "./routes/Bloggers";
import Footer from "./routes/Footer";
import BloggerDetail from "./routes/BloggerDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <>
        <HeaderUser />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:_id",
        element: <PostDetail />,
      },
      {
        path: "bloggers",
        element: <Bloggers />,
      },
      {
        path: "bloggers/:_id",
        element: <BloggerDetail />,
      },
    ],
  },
  {
    element: <BloggerProtected />,
    children: [
      {
        path: "/p",
        element: (
          <div>
            <Header />
            <Outlet />
            <Footer />
          </div>
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
              {
                path: "user",
                element: <User />,
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
