import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
    },
    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);
      findItem.count--;

      if (findItem.count === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addItem, minusItem, removeItem, clearItem } =
  cartSlice.actions;
export default cartSlice.reducer;
