import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <div key={product.product_id} className="my-3">
          <Link to={`/products/${product.product_id}`}>
            <ProductDetails loadedProduct={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};
