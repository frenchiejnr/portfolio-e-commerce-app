import { ProtectedRoute } from ".";
import React from "react";
import { OrderPage } from "../pages/OrderPage/OrderPage";

export const ProtectedRoutes = (user) => {
  return [
    {
      path: "/",
      element: <ProtectedRoute user={user} />,
      children: [
        { path: "/orders", element: <OrderPage /> },
        { path: "/orders/:orderId", element: <h1>Hello Orders</h1> },
      ],
    },
  ];
};
