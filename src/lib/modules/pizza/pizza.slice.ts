import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PizzaState {
  selectedPizza: Pizza | undefined;
}

const initialState: PizzaState = {
  selectedPizza: undefined
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  selectors: {},
  reducers: {
    select: (state, action: PayloadAction<Pizza>) => {
      state.selectedPizza = action.payload;
    }
  }
});
