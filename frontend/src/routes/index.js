import { Navigate, Outlet } from "react-router-dom";
import { publicRoutes } from "./public";
import { ProtectedRoutes } from "./protected";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <h1>HelloApp</h1> }];
  const authenticated = window.localStorage.getItem("isAuthenticated");
  const protectedRoutes = ProtectedRoutes(authenticated);
  const element = [...publicRoutes, ...commonRoutes, ...protectedRoutes];
  console.log(element);
  return element;
};

export const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};
