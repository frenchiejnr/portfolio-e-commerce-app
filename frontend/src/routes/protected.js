import React from "react";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import store from "../store/store";
import { Order } from "../components/Order/Order";
import { CartPage } from "../pages/CartPage/CartPage";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  const cookies = document.cookie;
  const authTokenMatch = cookies.match(/auth_token=(.*?)(;|$)/);
  if (!authTokenMatch) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const ProtectedRoutes = (user) => {
  return [
    {
      path: "",
      element: <ProtectedRoute user={user} />,
      children: [
        {
          path: "/",
          element: <Layout />,
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
            {
              path: "/cart",
              element: <CartPage />,
            },
          ],
        },
      ],
    },
  ];
};
