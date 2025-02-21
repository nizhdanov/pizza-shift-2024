import { createAppSlice } from '@/lib/redux';

export type PaymentStage = 'personDetails' | 'myAddresses' | 'newAddress' | 'debitCard';

const initialState = {
  stage: 'personDetails' as PaymentStage,
  pizzaPayment: null as PizzaPaymentResponse | null
};

export const pizzaSlice = createAppSlice({
  name: 'pizza',
  initialState,
  selectors: {
    selectPaymentStage: (state) => state.stage,
    selectPizzaPaymentResult: (state) => state.pizzaPayment
  },
  reducers: (create) => {
    return {
      setPaymentStage: create.reducer<PaymentStage>((state, { payload }) => {
        state.stage = payload;
      }),
      setPizzaPaymentResult: create.reducer<PizzaPaymentResponse | null>((state, { payload }) => {
        state.pizzaPayment = payload;
      })
    };
  }
});

export const { selectPaymentStage, selectPizzaPaymentResult } = pizzaSlice.selectors;

export const { setPaymentStage, setPizzaPaymentResult } = pizzaSlice.actions;
