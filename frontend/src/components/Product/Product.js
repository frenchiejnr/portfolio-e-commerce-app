import { useLoaderData } from "react-router-dom";
import "./Product.css";
export const Product = ({ product }) => {
  const load = useLoaderData();
  let loadedProduct;
  if (product) {
    loadedProduct = product;
  } else {
    loadedProduct = load[0];
  }

  const handleClick = () => {};
  return (
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
      <button onClick={handleClick}>Add to cart</button>
    </div>
  );
};
