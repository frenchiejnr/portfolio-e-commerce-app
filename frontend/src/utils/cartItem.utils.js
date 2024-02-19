import dayjs from "dayjs";
import { API_URL } from "../config/index";

export const manageProductInCart = async (cartId, productId) => {
  const res = await fetch(`${API_URL}/cart/${cartId}/cart-items`);
  const cartProducts = await res.json();
  const foundProduct = cartProducts.find(
    (object) => object[`product_id`] === productId,
  );
  if (foundProduct) {
    updateCartItemQuantity(foundProduct);
  } else {
    createCartItem(productId, cartId);
  }
};

const createCartItem = (productId, cartId) => {
  fetch(`${API_URL}/cart-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quantity: 1,
      added_at: dayjs().toISOString(),
      product_id: productId,
      cart_id: cartId,
    }),
  });
};
const updateCartItemQuantity = (foundProduct) => {
  fetch(`${API_URL}/cart-item/${foundProduct.cart_item_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      field: "quantity",
      value: Number(foundProduct.quantity) + 1,
    }),
  });
};
