import { Login } from "../components/Login/Login";
import { Product } from "../components/Product/Product";
import { ProductList } from "../components/ProductList/ProductList";
import { Register } from "./Register";
export const publicRoutes = [
  { path: "/register", element: <Register /> },
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
  { path: "/products", element: <ProductList /> },
];
