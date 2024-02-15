import { Link, useLoaderData, useNavigate } from "react-router-dom";
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
    <div className="h-full">
      <Link
        to={"/products"}
        className="flex w-fit rounded-xl bg-indigo-700 py-px pr-2 text-indigo-100 shadow-md
          transition-colors duration-150 hover:bg-indigo-800 fixed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        All Products
      </Link>
      <div className="flex min-h-full items-center justify-center">
        <div>
          <div className="my-3">
            <ProductDetails loadedProduct={loadedProduct} />
          </div>
          <button
            onClick={handleAddToCart}
            className="focus:shadow-outline mx-auto block h-12 w-full max-w-md overflow-hidden
              rounded-xl bg-indigo-700 px-6 text-indigo-100 shadow-md transition-colors
              duration-150 hover:bg-indigo-800 md:max-w-2xl md:shrink-0"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
