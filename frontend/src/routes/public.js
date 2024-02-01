import { Login } from "../components/Login/Login";
import { Product } from "../components/Product/Product";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
export const publicRoutes = [
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <Login /> },
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
];
