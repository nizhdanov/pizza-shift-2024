import { createAppSlice } from '../redux';

export type PaymentStage = 'personDetails' | 'myAddresses' | 'newAddress' | 'debitCard';

const initialState = {
  payment: 'personDetails' as PaymentStage,
  auth: ''
};

export const stageSlice = createAppSlice({
  name: 'stage',
  initialState,
  selectors: {
    selectPaymentStage: (state) => state.payment
  },
  reducers: (create) => {
    return {
      setPaymentStage: create.reducer<PaymentStage>((state, { payload }) => {
        state.payment = payload;
      })
    };
  }
});

export const { selectPaymentStage } = stageSlice.selectors;

export const { setPaymentStage } = stageSlice.actions;
