import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { OrderItemsTable } from "../OrderItemsTable/OrderItemsTable";
import { OrderDetails } from "../OrderDetails/OrderDetails";

export const Order = () => {
  const [orderItems, setOrderItems] = useState([]);
  const load = useLoaderData();
  const order = load[0];
  const id = order.order_id;
  const getOrderItems = async () => {
    const res = await fetch(`http://localhost:4001/orders/${id}/items`);
    const orderItemJson = await res.json();
    setOrderItems(orderItemJson);
  };

  useEffect(() => {
    if (id) {
      getOrderItems();
    }
  }, []);

  return (
    <>
      <OrderDetails order={order} />
      <div>
        <OrderItemsTable orderItems={orderItems} />
      </div>
    </>
  );
};
