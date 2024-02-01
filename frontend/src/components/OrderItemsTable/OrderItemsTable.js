import React from "react";

export function OrderItemsTable({ orderItems }) {
  return (
    <table>
      <thead>
        <tr>
          <th />
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
        <tr
          style={{
            fontWeight: "bold",
          }}
        >
          <td />
          <td />
          <td>Total</td>
          <td>
            £
            {orderItems.length === 0
              ? `0.00`
              : orderItems
                  .reduce((acc, item) => {
                    return acc + parseFloat(item.total);
                  }, 0)
                  .toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                  })}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
