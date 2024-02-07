import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../utils/cart.utils";
import { setCartId } from "../../store/cartSlice";
import { CartItem } from "../../components/CartItem/CartItem";

export const CartPage = () => {
  const [thisCartId, setThisCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const id = useSelector((state) => state.user.userId);
  const initialized = useRef(false);
  const dispatch = useDispatch();

  const fetchCartId = async () => {
    const cartJson = await getCart(id);
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

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (id) {
        fetchCartId();
      }
    }
  }, []);

  useEffect(() => {
    if (thisCartId) {
      fetchCartItems();
    }
  }, [thisCartId]);

  return (
    <div>
      <h1>{thisCartId}</h1>
      <div>
        {cartItems.map((item) => (
          <div>
            {console.log(item)}
            <CartItem item={item} key={item.product_id} />
            <button onClick={() => handleDelete(item)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};
