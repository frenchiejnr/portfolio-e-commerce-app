import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const id = useSelector((state) => state.user.userId);
  const getOrders = async () => {
    const res = await fetch(`http://localhost:4001/users/${id}/orders`);
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
      {id
        ? orders.length === 0
          ? "No Orders"
          : orders.map((order) => {
              return (
                <p key={order.order_id}>
                  <Link to={`/orders/${order.order_id}`}>{order.order_id}</Link>
                </p>
              );
            })
        : "Invalid Id"}
    </div>
  );
};
