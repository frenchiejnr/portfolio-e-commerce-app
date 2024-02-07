import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AppRoutes } from "../routes";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
const router = createBrowserRouter([...AppRoutes()]);

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>{children}</RouterProvider>
    </Provider>
  );
};
