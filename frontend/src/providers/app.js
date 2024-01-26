import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "../routes";

const router = createBrowserRouter([...AppRoutes()]);

export const AppProvider = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};
