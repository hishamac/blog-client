import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Home
        <ModeToggle />
      </div>
    ),
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster />
    <RouterProvider router={router} />
  </ThemeProvider>
);
