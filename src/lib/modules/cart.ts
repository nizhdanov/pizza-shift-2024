import { createSelector } from '@reduxjs/toolkit';

import { calculatePizzaPrice } from '@utils/calculatePizzaPrice';

import { createAppSlice } from '../redux';

const initialState: CartItem[] = [];

const isSame = (a: CartItem, b: SelectedPizza) =>
  a.doughs.name === b.doughs.name &&
  a.size.name === b.size.name &&
  a.toppings
    .map((t) => t.name)
    .sort()
    .toString() ===
    b.toppings
      .map((t) => t.name)
      .sort()
      .toString();

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  selectors: {
    selectCartItems: (state) => state,
    selectTotalCount: createSelector(
      (state: typeof initialState) => state,
      (cart) => cart.reduce((acc, item) => acc + item.count, 0)
    ),
    selectTotalPrice: createSelector(
      (state: typeof initialState) => state,
      (cart) =>
        cart.reduce(
          (acc, item) =>
            acc + calculatePizzaPrice(item.size, item.doughs, item.toppings) * item.count,
          0
        )
    ),
    selectPizzas: createSelector(
      (state: typeof initialState) => state,
      (cart) =>
        cart.map((item) => {
          const cartPizza: CartPizza = {
            id: item.pizzaId,
            doughs: item.doughs,
            size: item.size,
            toppings: item.toppings,
            name: 'Четыре Сыра',
            description: 'Пицца с миксом моцареллы, чеддера, пармезана и феты.'
          };

          return cartPizza;
        })
    )
  },
  reducers: (create) => ({
    add: create.asyncThunk<SelectedPizza, undefined>(
      (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const item = JSON.parse(JSON.stringify(state.selectedItem));
        return item as SelectedPizza;
      },
      {
        fulfilled: (state, { payload }) => {
          const sameItem = state.find((item) => isSame(item, payload));

          if (sameItem) {
            sameItem.count += 1;
          } else {
            state.push({
              ...payload,
              count: 1,
              uid: Date.now().toString()
            });
          }
        }
      }
    ),

    update: create.asyncThunk<SelectedPizza, undefined>(
      (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const item = JSON.parse(JSON.stringify(state.selectedItem));
        return item as SelectedPizza;
      },
      {
        fulfilled: (state, { payload }) => {
          const sameItem = state.find((item) => isSame(item, payload));
          const item = state.find((item) => item.uid === payload.uid)!;
          const index = state.findIndex((item) => item.uid === payload.uid);

          if (sameItem) {
            sameItem.count += item.count;
            state.splice(index, 1);
          } else {
            item.doughs = payload.doughs;
            item.size = payload.size;
            item.toppings = payload.toppings;
          }
        }
      }
    ),

    remove: create.reducer<string>((state, { payload }) => {
      const index = state.findIndex((item) => item.uid === payload);
      state.splice(index, 1);
    }),

    increase: create.reducer<string>((state, { payload }) => {
      const item = state.find((item) => item.uid === payload)!;
      item.count += 1;
    }),

    decrease: create.reducer<string>((state, { payload }) => {
      const item = state.find((item) => item.uid === payload)!;
      const index = state.findIndex((item) => item.uid === payload);

      if (item.count > 1) {
        item.count -= 1;
      } else {
        state.splice(index, 1);
      }
    }),

    clearCart: create.reducer(() => initialState)
  })
});

export const { selectCartItems, selectTotalCount, selectTotalPrice, selectPizzas } =
  cartSlice.selectors;

export const { add, update, remove, decrease, increase, clearCart } = cartSlice.actions;
