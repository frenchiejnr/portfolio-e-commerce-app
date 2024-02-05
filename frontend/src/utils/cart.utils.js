import dayjs from "dayjs";
export const getCart = async (id) => {
  let res = await fetch(`http://localhost:4001/users/${id}/cart`);
  console.log(res.status);
  if (res.status === 404) {
    await createCart(id);
    res = await fetch(`http://localhost:4001/users/${id}/cart`);
  }
  return await res.json();
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
