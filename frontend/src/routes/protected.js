import { ProtectedRoute } from ".";
import React from "react";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import store from "../store/store";
import { Order } from "../components/Order/Order";
export const ProtectedRoutes = (user) => {
  return [
    {
      path: "/",
      element: <ProtectedRoute user={user} />,
      children: [
        { path: "/orders", element: <OrderPage /> },
        {
          path: "/orders/:orderId",
          element: <Order />,
          loader: async ({ request, params }) => {
            const userId = store.getState().user.userId;
            if (!userId) {
              return new Response("Invalid user", {
                status: 400,
              });
            }
            if (Number.isNaN(params.orderId)) {
              return new Response("Invalid order ID", { status: 400 });
            }
            return fetch(
              `http://localhost:4001/users/${userId}/orders/${params.orderId}`,
              {
                signal: request.signal,
              }
            );
          },
        },
      ],
    },
  ];
};
