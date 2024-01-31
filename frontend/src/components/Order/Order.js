import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
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
    console.log(orderItems);
  }, []);

  return (
    <>
      <div>
        <p>Order ID: {order.order_id}</p>
        <p>Order Date: {order.order_date}</p>
        <p>Status: {order.status}</p>
        <p>Tracking Number: {order.tracking_number}</p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((orderItem) => {
              return (
                <tr key={orderItem.name}>
                  <td>{<img src={orderItem.image_url} />}</td>
                  <td>{orderItem.name}</td>
                  <td>{orderItem.total_quantity}</td>
                  <td>
                    £
                    {parseFloat(orderItem.total).toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
            <tr style={{ fontWeight: "bold" }}>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>
                £
                {orderItems.length === 0
                  ? `0.00`
                  : orderItems
                      .reduce((acc, item) => {
                        return acc + parseFloat(item.total);
                      }, 0)
                      .toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
