import "./Product.css";
export const Product = ({ product }) => {
  return (
    <div id="card">
      <div>
        <img src={product.image_url} />
      </div>
      <div>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>£{product.price}</p>
        <p>Units in Stock: {product.stock_level}</p>
      </div>
    </div>
  );
};
