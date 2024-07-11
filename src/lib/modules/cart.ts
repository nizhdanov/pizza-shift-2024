import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { calculatePizzaPrice } from '@utils/calculatePizzaPrice';

const initialState: Record<CartItem['value']['id'], CartItem> = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  selectors: {
    cartItems: createSelector(
      (state: typeof initialState) => state,
      (cart) => Object.values(cart)
    ),
    totalCount: createSelector(
      (state: typeof initialState) => state,
      (cart) => Object.values(cart).reduce((acc, curr) => acc + curr.count, 0)
    ),
    totalPrice: createSelector(
      (state: typeof initialState) => state,
      (cart) =>
        Object.values(cart)
          .map(
            ({ count, size, doughs, toppings }) =>
              calculatePizzaPrice(size, doughs, toppings) * count
          )
          .reduce((a, b) => a + b, 0)
    )
  },
  reducers: {
    add: (state, { payload }: PayloadAction<CartItem>) => {
      state[payload.uid] = payload;
    },
    remove: (state, { payload: uid }: PayloadAction<number>) => {
      delete state[uid];
    },

    increase: (state, { payload: uid }: PayloadAction<number>) => {
      state[uid].count++;
    },
    decrease: (state, { payload: uid }: PayloadAction<number>) => {
      if (state[uid].count > 1) {
        state[uid].count--;
      } else {
        delete state[uid];
      }
    }
  }
});
