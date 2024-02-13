import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "../routes";
import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
const router = createBrowserRouter([...AppRoutes()]);

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}>{children}</RouterProvider>
      </PersistGate>
    </Provider>
  );
};
