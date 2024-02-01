import { Link, useLoaderData } from "react-router-dom";
import "./Product.css";
import { ProductDetails } from "../ProductDetails/ProductDetails";
export const Product = ({ product }) => {
  const load = useLoaderData();
  const loadedProduct = product ? product : load[0];

  const handleClick = () => {};
  return (
    <>
      <div className="card">
        <ProductDetails loadedProduct={loadedProduct} />
        <button onClick={handleClick}>Add to cart</button>
      </div>
      <div>
        <Link to={"/products"}>All Products</Link>
      </div>
    </>
  );
};
