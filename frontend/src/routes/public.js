import Layout from "../components/Layout/Layout";
import { Product } from "../components/Product/Product";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
export const publicRoutes = [
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/products/:productId",
        element: <Product />,
        loader: async ({ request, params }) => {
          return fetch(`http://localhost:4001/products/${params.productId}`, {
            signal: request.signal,
          });
        },
      },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
];
