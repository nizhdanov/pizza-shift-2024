import { useContext } from 'react';

import { PaymentResponseContext } from './PaymentResponseContext';

export const usePaymentResponse = () => useContext(PaymentResponseContext);
