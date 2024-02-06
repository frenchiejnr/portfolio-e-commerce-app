import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "./Product.css";
import { ProductDetails } from "../ProductDetails/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../utils/cart.utils";
import { setCartId } from "../../store/cartSlice";
import { manageProductInCart } from "../../utils/cartItem.utils";

export const Product = ({ product }) => {
  const load = useLoaderData();
  const loadedProduct = product ? product : load[0];
  let cartId = useSelector((state) => state.cart.cartId);
  const userId = useSelector((state) => state.user.userId);
  const productId = loadedProduct.product_id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (userId === null) {
      navigate("/login");
      return;
    }
    if (cartId === null) {
      const cartJson = await getCart(userId);
      cartId = cartJson[0].cart_id;
      dispatch(setCartId(cartId));
    }
    manageProductInCart(cartId, productId);
  };
  return (
    <>
      <div className="card">
        <ProductDetails loadedProduct={loadedProduct} />
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
      <div>
        <Link to={"/products"}>All Products</Link>
      </div>
    </>
  );
};
