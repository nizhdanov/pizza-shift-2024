import { createContext } from 'react';

export interface PaymentResponseContextProps {
  paymentResponse: PizzaPaymentResponse;
  setPaymentResponse: (response: PizzaPaymentResponse) => void;
}

export const PaymentResponseContext = createContext<PaymentResponseContextProps>({
  paymentResponse: null!,
  setPaymentResponse: () => {}
});
