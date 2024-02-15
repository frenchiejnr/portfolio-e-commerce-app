export const OrderDetails = ({ order }) => {
  const formattedDate = formatDate(order.order_date);
  return (
    <div className="flex flex-col text-right sm:flex-row sm:justify-evenly sm:text-left">
      <div>
        <p className="font-bold">Order ID:</p>
        <p>{order.order_id}</p>
      </div>
      <div>
        <p className="font-bold">Order Date:</p>
        <p>{formattedDate}</p>
      </div>
      <div>
        <p className="font-bold">Status:</p>
        <p>{order.status}</p>
      </div>
      <div>
        <p className="font-bold">Tracking Number:</p>
        <p>{order.tracking_number}</p>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  try {
    // Create a Date object for reliable formatting
    const date = new Date(dateString);

    // Use JavaScript's built-in formatting capabilities
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return `Error: Invalid date format`;
  }
};
