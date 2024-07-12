import { useMemo, useState } from 'react';

import { PaymentResponseContext } from './PaymentResponseContext';

export interface PaymentResponseProviderProps {
  children: React.ReactNode;
}

export const PaymentResponseProvider = ({ children }: PaymentResponseProviderProps) => {
  const [paymentResponse, setPaymentResponse] = useState<PizzaPaymentResponse>(null!);

  const value = useMemo(() => ({ paymentResponse, setPaymentResponse }), [paymentResponse]);

  return (
    <PaymentResponseContext.Provider value={value}>{children}</PaymentResponseContext.Provider>
  );
};
