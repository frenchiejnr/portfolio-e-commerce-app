import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import { API_URL } from "../../config/index";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () =>
    await fetch(`${API_URL}/products`)
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
