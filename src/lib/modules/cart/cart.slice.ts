import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = CartPizza & {
  count: number;
  img: string;
};

const initialState: Record<CartItem['id'], CartItem> = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  selectors: {},
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
      state[action.payload].count--;
    },

    change: (state, action: PayloadAction<CartItem>) => {
      state[action.payload.id] = action.payload;
    }
  }
});
