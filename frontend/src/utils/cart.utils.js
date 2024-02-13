import dayjs from "dayjs";
export const getCart = async (id) => {
  let res = await fetch(`http://localhost:4001/users/${id}/cart`);
  let cartId = await res.json();

  // If cart doesn't exist
  if (res.status === 404) {
    await createCart(id);
    res = await fetch(`http://localhost:4001/users/${id}/cart`);
    cartId = await res.json();
  }

  // If cart has been completed
  const completed = await fetch(
    `http://localhost:4001/cart/${cartId[0].cart_id}/completed`
  );
  const isCompleted = await completed.json();
  if (isCompleted.length > 0) {
    await createCart(id);
    res = await fetch(`http://localhost:4001/users/${id}/cart`);
    cartId = await res.json();
  }

  return cartId;
};

export const createCart = async (id) => {
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
};
