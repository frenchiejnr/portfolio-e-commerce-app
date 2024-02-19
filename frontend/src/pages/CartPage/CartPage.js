import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../utils/cart.utils";
import { setCartId, setTotal } from "../../store/cartSlice";
import { CartItem } from "../../components/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/index";
export const CartPage = () => {
  const [thisCartId, setThisCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const cartTotal = useSelector((state) => state.cart.total);
  const initialized = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCartId = async () => {
    const cartJson = await getCart(userId);
    setThisCartId(cartJson[0].cart_id);
    dispatch(setCartId(cartJson[0].cart_id));
  };

  const fetchCartItems = async () => {
    const res = await fetch(`${API_URL}/cart/${thisCartId}/cart-items`);
    setCartItems(await res.json());
  };

  const handleDelete = async (item) => {
    await fetch(`${API_URL}/cart-item/${item.cart_item_id}`, {
      method: "DELETE",
    });
    setCartItems((prevCartItems) =>
      prevCartItems.filter((i) => i.cart_item_id !== item.cart_item_id),
    );
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (userId) {
        fetchCartId();
      }
    }
  }, []);

  useEffect(() => {
    if (thisCartId) {
      fetchCartItems();
    }
  }, [thisCartId]);

  useEffect(() => {
    const total = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0,
    );
    dispatch(setTotal(total * 100));
  }, [cartItems]);

  return (
    <div className="h-full">
      <h1 className="p-1 text-center text-xl font-semibold" key={thisCartId}>
        Cart: {thisCartId}
      </h1>
      <div>
        {cartItems.map((item) => (
          <div className="my-3 flex">
            <div className="basis-11/12">
              <CartItem item={item} key={item.product_id} />
            </div>
            <button className="basis-1/12 " onClick={() => handleDelete(item)}>
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="flex">
        <button
          onClick={handleCheckoutClick}
          className="focus:shadow-outline ml-auto mr-10 h-12 w-full max-w-md basis-11/12
            overflow-hidden rounded-xl bg-indigo-700 px-6 text-indigo-100 shadow-md
            transition-colors duration-150 hover:bg-indigo-800 md:max-w-2xl md:shrink-0"
        >
          <p className="text-xl">
            Checkout £{parseFloat(cartTotal / 100).toFixed(2)}
          </p>
        </button>
        <div className="basis-1/12"></div>
      </div>
    </div>
  );
};
