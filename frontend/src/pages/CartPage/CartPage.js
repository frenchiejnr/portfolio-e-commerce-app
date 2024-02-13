import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../utils/cart.utils";
import { setCartId, setTotal } from "../../store/cartSlice";
import { CartItem } from "../../components/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
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
    const res = await fetch(
      `http://localhost:4001/cart/${thisCartId}/cart-items`
    );
    setCartItems(await res.json());
  };

  const handleDelete = async (item) => {
    await fetch(`http://localhost:4001/cart-item/${item.cart_item_id}`, {
      method: "DELETE",
    });
    setCartItems((prevCartItems) =>
      prevCartItems.filter((i) => i.cart_item_id !== item.cart_item_id)
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
      0
    );
    dispatch(setTotal(total * 100));
  }, [cartItems]);

  return (
    <div>
      <h1 key={thisCartId}>{thisCartId}</h1>
      <div>
        {cartItems.map((item) => (
          <div>
            <CartItem item={item} key={item.product_id} />
            <button onClick={() => handleDelete(item)}>x</button>
          </div>
        ))}
      </div>
      <button onClick={handleCheckoutClick}>Checkout £{cartTotal / 100}</button>
    </div>
  );
};
