import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../utils/cart.utils";
import { setCartId } from "../../store/cartSlice";

export const CartPage = () => {
  const [cart, setCart] = useState([{}]);
  const id = useSelector((state) => state.user.userId);
  const initialized = useRef(false);
  const dispatch = useDispatch();

  const fetchCartId = async () => {
    const cartJson = await getCart(id);
    dispatch(setCartId(cartJson[0].cartId));
    setCart(cartJson);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (id) {
        fetchCartId();
      }
    }
  }, []);

  return (
    <div>
      <h1>{cart[0].cart_id}</h1>
    </div>
  );
};
