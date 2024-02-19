import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/index";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const id = useSelector((state) => state.user.userId);
  const getOrders = async () => {
    const res = await fetch(`${API_URL}/users/${id}/orders`);
    const orderJson = await res.json();
    setOrders(orderJson);
  };

  useEffect(() => {
    if (id) {
      getOrders();
    }
  }, []);
  return (
    <div>
      {orders && (
        <h1 className="p-1 text-center text-xl font-semibold">Your Orders</h1>
      )}
      {orders.length === 0 && "No Orders"}
      {orders.map((order) => (
        <p
          key={order.order_id}
          className="text-center bg-white shadow-md my-3 rounded-md max-w-80 mx-auto h-fittext-sm
            font-semibold uppercase tracking-wide text-indigo-500 border-indigo-500 border"
        >
          <Link to={`/orders/${order.order_id}`}>{order.order_id}</Link>
        </p>
      ))}
      {!id && "Invalid Id"}
    </div>
  );
};
