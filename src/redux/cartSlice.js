import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    add: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.product._id === action.payload.product._id
      );

      if (itemInCart) {
        alert("Booking already in cart!");
      } else {
        state.cart.push({ ...action.payload });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product._id === action.payload
      );

      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.product._id === action.payload
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    remove(state, action) {
      const removeItem = state.cart.filter(
        (item) => item.product._id !== action.payload
      );
      state.cart = removeItem;
    },
    clear: (state, action) => {
      state.cart = [];
    },
  },
});

export const { add, remove, incrementQuantity, decrementQuantity, clear } =
  cartSlice.actions;
export default cartSlice.reducer;
