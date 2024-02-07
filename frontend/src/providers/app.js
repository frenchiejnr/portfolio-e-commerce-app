import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "../routes";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import Layout from "../components/Layout/Layout";
const router = createBrowserRouter([...AppRoutes()]);

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <Layout>
        <RouterProvider router={router}>{children}</RouterProvider>
      </Layout>
    </Provider>
  );
};
