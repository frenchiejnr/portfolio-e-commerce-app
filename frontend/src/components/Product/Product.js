import "./Product.css";
export const Product = ({
  productName,
  productDescription,
  productPrice,
  productStockLevel,
  productImageUrl,
}) => {
  return (
    <div id="card">
      <div>
        <img src={productImageUrl} />
      </div>
      <div>
        <p>{productName}</p>
        <p>{productDescription}</p>
        <p>£{productPrice}</p>
        <p>Units in Stock: {productStockLevel}</p>
      </div>
    </div>
  );
};
