import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <h1>Hello Orders</h1> }];
  const element = [...publicRoutes, ...commonRoutes];
  return element;
};
