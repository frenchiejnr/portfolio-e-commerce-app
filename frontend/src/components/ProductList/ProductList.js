import { useEffect, useState } from "react";
import { Product } from "../Product/Product";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () =>
    await fetch("http://localhost:4001/products")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setProducts(response);
      });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Product product={product} key={product.product_id} />
      ))}
    </div>
  );
};
