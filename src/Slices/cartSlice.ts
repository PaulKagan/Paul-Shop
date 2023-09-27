import { Cart, Product } from "../Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      let cartItem = state.cart.find((item) => item.id === action.payload.id);
      if (cartItem) {
        state.cart = state.cart.map((item) => {
          if (item.id === cartItem?.id) {
            if (item.count !== undefined && item.price !== undefined) {
              item.price /= item.count;
              item.count += 1;
              item.price *= item.count;
            }
            return item;
          }
          return item;
        });
      } else {
        cartItem = action.payload;
        cartItem.count = 1;
        state.cart = [...state.cart, cartItem];
      }
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      //? not sure if this check is necessary
      if (state.cart.length === 0 || action.payload === null) {
        return;
      }
      state.cart = state.cart.filter(
        product => product.id !== action.payload.id
      );
    },

    removeCopy: (state, action: PayloadAction<Product>) => {
      let cartItem = state.cart.find((item) => item.id === action.payload.id);
      if (cartItem) {
        state.cart = state.cart.map((item) => {
          if (item.id === cartItem?.id) {
            if (item.count !== undefined && item.price !== undefined) {
              item.price /= item.count;
              item.count -= 1;
              item.price *= item.count;
            }
            return item;
          }
          return item;
        });
      }
    },

    emptyCart: (state) => {
      state.cart = [];
    }
  },
});

export const { addToCart, removeFromCart, removeCopy, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
