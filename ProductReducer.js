import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload });
    },

    incrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },

    decrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        if (itemPresent.quantity === 1) {
          const removeItemIndex = state.product.findIndex(
            (item) => item.id === action.payload.id
          );

          if (removeItemIndex !== -1) {
            state.product.splice(removeItemIndex, 1);
          }
        } else {
          itemPresent.quantity--;
        }
      }
    },
  },
});

export const { getProducts, incrementQty, decrementQty } = ProductSlice.actions;

export default ProductSlice.reducer;
