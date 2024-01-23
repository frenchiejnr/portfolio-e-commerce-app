import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Product } from "./components/Product/Product";
import { ProductList } from "./components/ProductList/ProductList";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="/login" element={<Login />} />,
    <Route
      path="/products/:productId"
      element={<Product />}
      loader={async ({ request, params }) => {
       return fetch(
          `http://localhost:4001/products/${params.productId}`,
          {
            signal: request.signal,
          }
        );
      }}
    />,
    <Route path="/products" element={<ProductList />} />,
    <Route path="/orders" element={<h1>Hello Orders</h1>} />,
    <Route path="/orders/:orderId" element={<h1>Hello Orders</h1>} />,
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
