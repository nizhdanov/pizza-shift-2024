import { createAppSlice } from '../redux';

const initialState = {
  pizzaPayment: null as PizzaPaymentResponse | null
};

export const mutationResultSlice = createAppSlice({
  name: 'mutationResult',
  initialState,
  selectors: {
    selectPizzaPaymentResult: (state) => state.pizzaPayment
  },
  reducers: (create) => {
    return {
      setPizzaPaymentResult: create.reducer<PizzaPaymentResponse | null>((state, { payload }) => {
        state.pizzaPayment = payload;
      })
    };
  }
});

export const { selectPizzaPaymentResult } = mutationResultSlice.selectors;

export const { setPizzaPaymentResult } = mutationResultSlice.actions;
