import { ProtectedRoute } from ".";
import React from "react";
import { Orders } from "../components/Orders/Orders";

export const ProtectedRoutes = (user) => {
  return [
    {
      path: "/",
      element: <ProtectedRoute user={user} />,
      children: [
        { path: "/orders", element: <Orders /> },
        { path: "/orders/:orderId", element: <h1>Hello Orders</h1> },
      ],
    },
  ];
};
