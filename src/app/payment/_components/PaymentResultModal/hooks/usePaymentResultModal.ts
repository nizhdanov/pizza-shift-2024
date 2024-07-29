import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { selectSelectedAddress } from '@modules/address';
import { clearCart, selectCartItems, selectTotalPrice } from '@modules/cart';
import { selectPizzaPaymentResult, setPizzaPaymentResult } from '@modules/mutationResult';
import { setPaymentStage } from '@modules/stage';
import { PATHS } from '@constants/paths';

export const usePaymentResultModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedAddress = useAppSelector(selectSelectedAddress);
  const paymentResult = useAppSelector(selectPizzaPaymentResult);
  const totalPrice = useAppSelector(selectTotalPrice);
  const cartItems = useAppSelector(selectCartItems);

  const address = selectedAddress ? selectedAddress.value + selectedAddress.apartment : '';

  const open = !!paymentResult;
  const onClose = () => {
    dispatch(setPizzaPaymentResult(null));
    if (paymentResult?.success) {
      dispatch(clearCart());
      navigate(PATHS.index, { replace: true });
    } else {
      dispatch(setPaymentStage('personDetails'));
    }
  };

  return { onClose, open, paymentResult, address, totalPrice, cartItems };
};
