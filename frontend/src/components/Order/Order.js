import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { OrderItemsTable } from "../OrderItemsTable/OrderItemsTable";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { API_URL } from "../../config/index";

export const Order = () => {
  const [orderItems, setOrderItems] = useState([]);
  const load = useLoaderData();
  const order = load[0];
  const id = order.order_id;
  const token = window.localStorage.getItem("jwt_token");
  const getOrderItems = async () => {
    const res = await fetch(`${API_URL}/orders/${id}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const orderItemJson = await res.json();
    setOrderItems(orderItemJson);
  };

  useEffect(() => {
    if (id) {
      getOrderItems();
    }
  }, []);

  return (
    <div className="h-auto">
      <div className=" top-0 sticky">
        <Link
          to={"/orders"}
          className="flex w-fit rounded-xl bg-indigo-700 py-px pr-2 text-indigo-100 shadow-md
            transition-colors duration-150 hover:bg-indigo-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          All Orders
        </Link>
      </div>
      <OrderDetails order={order} className="" />
      <OrderItemsTable orderItems={orderItems} />
    </div>
  );
};
