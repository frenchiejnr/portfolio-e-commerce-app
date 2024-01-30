import { Navigate, Outlet } from "react-router-dom";
import { publicRoutes } from "./public";
import { ProtectedRoutes } from "./protected";
import { HomePage } from "../pages/HomePage/HomePage";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <HomePage /> }];
  const authenticated = window.localStorage.getItem("isAuthenticated");
  const protectedRoutes = ProtectedRoutes(authenticated);
  const element = [...publicRoutes, ...commonRoutes, ...protectedRoutes];
  return element;
};

export const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
