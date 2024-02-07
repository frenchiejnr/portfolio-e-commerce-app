import "./CartItem.css";
export const CartItem = ({ item }) => {
  return (
    <div className="card">
      <img src={item.image_url} />
      <div>
        <p>{item.name}</p>
        <p>£{item.price}</p>
        <p>{item.quantity}</p>
      </div>
      <br />
    </div>
  );
};
