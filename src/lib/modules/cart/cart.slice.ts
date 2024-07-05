import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = CartPizza & {
  count: number;
  img: string;
};

const initialState: Record<CartItem['id'], CartItem> = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  selectors: {
    selectCartItems: createSelector([(state: typeof initialState) => state], (cart) =>
      Object.values(cart)
    )
  },
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      state[action.payload.id] = action.payload;
    },
    remove: (state, action: PayloadAction<CartItem['id']>) => {
      delete state[action.payload];
    },

    increase: (state, action: PayloadAction<CartItem['id']>) => {
      state[action.payload].count++;
    },
    decrease: (state, action: PayloadAction<CartItem['id']>) => {
      if (state[action.payload].count > 1) {
        state[action.payload].count--;
      } else {
        delete state[action.payload];
      }
    },

    change: (state, action: PayloadAction<CartItem>) => {
      state[action.payload.id] = action.payload;
    }
  }
});
