import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CartItem = {
  value: {} as Pizza,
  count: 0,
  size: {} as PizzaSize,
  doughs: {} as PizzaDough,
  toppings: [],
  uid: 0
};

export const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  selectors: {
    selectIsOpened: createSelector(
      (state: typeof initialState) => state.value.id,
      (id) => id !== undefined && id !== null
    )
  },
  reducers: {
    selectFromPage: (state, { payload }: PayloadAction<Pizza>) => {
      state.value = payload;
      state.count = 1;
      state.size = payload.sizes[1];
      state.doughs = payload.doughs[0];
      state.toppings = [];
      state.uid = Date.now();
    },
    selectFromCart: (state, { payload }: PayloadAction<CartItem>) => {
      state.value = payload.value;
      state.count = payload.count;
      state.size = payload.size;
      state.doughs = payload.doughs;
      state.toppings = payload.toppings;
      state.uid = payload.uid;
    },

    selectSize: (state, { payload }: PayloadAction<PizzaSize>) => {
      state.size = payload;
    },
    selectDough: (state, { payload }: PayloadAction<PizzaDough>) => {
      state.doughs = payload;
    },
    selectTopping: (state, { payload }: PayloadAction<PizzaIngredient>) => {
      if (state.toppings.map((topping) => topping.name).includes(payload.name)) {
        state.toppings = state.toppings.filter((topping) => topping.name !== payload.name);
      } else {
        state.toppings.push(payload);
      }
    },

    clear: (state) => {
      state.count = initialState.count;
      state.doughs = initialState.doughs;
      state.size = initialState.size;
      state.toppings = initialState.toppings;
      state.value = initialState.value;
      state.uid = initialState.uid;
    }
  }
});
