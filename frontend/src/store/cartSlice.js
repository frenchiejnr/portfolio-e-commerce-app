import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartId: null, total: 0 },
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    clearCartId: (state) => {
      state.cartId = null;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    clearTotal: (state) => {
      state.total = 0;
    },
  },
});

export const { setCartId, clearCartId, setTotal, clearTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
