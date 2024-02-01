import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () =>
    await fetch("http://localhost:4001/products")
      .then((response) => response.json())
      .then((response) => {
        setProducts(response);
      });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.product_id} className="card">
          <ProductDetails loadedProduct={product} />
          <Link to={`/products/${product.product_id}`}>Go to product</Link>
        </div>
      ))}
    </div>
  );
};
