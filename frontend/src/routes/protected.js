import { Route } from "react-router-dom";
import { ProtectedRoute } from ".";
import React from "react";

export const ProtectedRoutes = (user) => {
  return [
    {
      path: "/",
      element: <ProtectedRoute user={user} />,
      children: [
        { path: "/orders", element: <h1>Hello Orders</h1> },
        { path: "/orders/:orderId", element: <h1>Hello Orders</h1> },
      ],
    },
  ];
};
