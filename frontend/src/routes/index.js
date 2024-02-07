import { publicRoutes } from "./public";
import { ProtectedRoutes } from "./protected";
import { HomePage } from "../pages/HomePage/HomePage";
import Layout from "../components/Layout/Layout";

export const AppRoutes = () => {
  const commonRoutes = [
    {
      path: "",
      element: <Layout />,
      children: [{ path: "/", element: <HomePage /> }],
    },
  ];
  const authenticated = window.localStorage.getItem("isAuthenticated");
  const protectedRoutes = ProtectedRoutes(authenticated);
  return [...commonRoutes, ...publicRoutes, ...protectedRoutes];
};
