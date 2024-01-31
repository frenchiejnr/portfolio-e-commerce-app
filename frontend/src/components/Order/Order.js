import { useLoaderData } from "react-router-dom";

export const Order = () => {
  const load = useLoaderData();
  const order = load[0];

  return (
    <div>
      <p>Order ID: {order.order_id}</p>
      <p>Order Date: {order.order_date}</p>
      <p>Status: {order.status}</p>
      <p>Tracking Number: {order.tracking_number}</p>
    </div>
  );
};
