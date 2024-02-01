import "./ProductDetails.css";

export const ProductDetails = ({ loadedProduct }) => (
  <div id="card">
    <div>
      <img src={loadedProduct.image_url} />
    </div>
    <div>
      <p>{loadedProduct.name}</p>
      <p>{loadedProduct.description}</p>
      <p>£{loadedProduct.price}</p>
      <p>Units in Stock: {loadedProduct.stock_level}</p>
    </div>
  </div>
);
