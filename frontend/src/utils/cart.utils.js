import dayjs from "dayjs";
import { API_URL } from "../config/index";
export const getCart = async (id) => {
  const token = window.localStorage.getItem("jwt_token");
  let res = await fetch(`${API_URL}/users/${id}/cart`);
  let cartId = await res.json();

  // If cart doesn't exist
  if (res.status === 404) {
    await createCart(id);
    res = await fetch(`${API_URL}/users/${id}/cart`);
    cartId = await res.json();
  }

  // If cart has been completed
  const completed = await fetch(
    `${API_URL}/cart/${cartId[0].cart_id}/completed`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const isCompleted = await completed.json();
  if (isCompleted.length > 0) {
    await createCart(id);
    res = await fetch(`${API_URL}/users/${id}/cart`);
    cartId = await res.json();
  }

  return cartId;
};

export const createCart = async (id) => {
  const currentISOTimestamp = dayjs().toISOString();
  const token = window.localStorage.getItem("jwt_token");
  await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: id,
      created_at: currentISOTimestamp,
      updated_at: currentISOTimestamp,
    }),
  });
};
