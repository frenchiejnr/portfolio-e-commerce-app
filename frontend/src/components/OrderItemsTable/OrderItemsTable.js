import React from "react";

export function OrderItemsTable({ orderItems }) {
  return (
    <div className="ml-4 flex items-center justify-center sm:ml-0">
      <table className="border-separate border-spacing-y-2 text-sm">
        <thead>
          <tr className="mb-4 flex flex-col font-bold sm:table-row">
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
          <tr className="hidden sm:table-row">
            <th />
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((orderItem) => {
            return (
              <tr
                key={orderItem.name}
                className="mb-4 flex flex-col sm:table-row"
              >
                <td className="w-full bg-gray-200 px-4 py-3 text-gray-900 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-t-none sm:first:rounded-bl-lg sm:first:rounded-tl-lg sm:last:rounded-b-none sm:last:rounded-br-lg sm:last:rounded-tr-lg">
                  {<img src={orderItem.image_url} className="mx-auto" />}
                </td>
                <td className="bg-gray-200 px-4 py-3 text-gray-900 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-t-none sm:first:rounded-bl-lg sm:first:rounded-tl-lg sm:last:rounded-b-none sm:last:rounded-br-lg sm:last:rounded-tr-lg">
                  {orderItem.name}
                </td>
                <td className="bg-gray-200 px-4 py-3 text-gray-900 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-t-none sm:first:rounded-bl-lg sm:first:rounded-tl-lg sm:last:rounded-b-none sm:last:rounded-br-lg sm:last:rounded-tr-lg">
                  {orderItem.total_quantity}
                </td>
                <td className="bg-gray-200 px-4 py-3 text-gray-900 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-t-none sm:first:rounded-bl-lg sm:first:rounded-tl-lg sm:last:rounded-b-none sm:last:rounded-br-lg sm:last:rounded-tr-lg">
                  £
                  {parseFloat(orderItem.total).toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
