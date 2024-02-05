import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setCartId } from "../../store/cartSlice";
export const CartPage = () => {
  const [cart, setCart] = useState([{}]);
  const id = useSelector((state) => state.user.userId);
  const initialized = useRef(false);
  const dispatch = useDispatch();
  const getCart = async () => {
    let res = await fetch(`http://localhost:4001/users/${id}/cart`);
    if (res.status === 404) {
      await createCart(id);
      res = await fetch(`http://localhost:4001/users/${id}/cart`);
    }
    const cartJson = await res.json();
    setCart(cartJson);
    dispatch(setCartId(cartJson[0].cartId));
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (id) {
        getCart();
      }
    }
  }, []);

  return (
    <div>
      <h1>{cart[0].cart_id}</h1>
    </div>
  );
};
async function createCart(id) {
  const currentISOTimestamp = dayjs().toISOString();
  await fetch(`http://localhost:4001/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: id,
      created_at: currentISOTimestamp,
      updated_at: currentISOTimestamp,
    }),
  });
}
