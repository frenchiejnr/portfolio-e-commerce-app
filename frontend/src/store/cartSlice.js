import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartId: null },
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    clearCartId: (state) => {
      state.cartId = null;
    },
  },
});

export const { setCartId, clearCartId } = cartSlice.actions;
export default cartSlice.reducer;
