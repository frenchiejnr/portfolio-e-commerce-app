import React from "react";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import { store } from "../store/store";
import { Order } from "../components/Order/Order";
import { CartPage } from "../pages/CartPage/CartPage";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";
import { ReturnPage } from "../pages/ReturnPage/ReturnPage";
import { API_URL } from "../config/index";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth.utils";
export const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  try {
    const decoded = jwtDecode(token, process.env.REACT_APP_JWT_SECRET_KEY);
    return children ? children : <Outlet />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
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
                const token = window.localStorage.getItem("jwt_token");

                if (!userId) {
                  return new Response("Invalid user", {
                    status: 400,
                  });
                }
                if (Number.isNaN(params.orderId)) {
                  return new Response("Invalid order ID", { status: 400 });
                }
                return fetch(
                  `${API_URL}/users/${userId}/orders/${params.orderId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    signal: request.signal,
                  },
                );
              },
            },
            {
              path: "/cart",
              element: <CartPage />,
            },
            {
              path: "/checkout",
              element: <CheckoutPage />,
            },
            {
              path: "/return",
              element: <ReturnPage />,
            },
          ],
        },
      ],
    },
  ];
};
