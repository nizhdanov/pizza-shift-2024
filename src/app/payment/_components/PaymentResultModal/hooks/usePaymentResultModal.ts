import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { selectSelectedAddress } from '@modules/address';
import { clearCart, selectCartItems, selectTotalPrice } from '@modules/cart';
import { selectPizzaPaymentResult, setPaymentStage, setPizzaPaymentResult } from '@modules/pizza';
import { PATHS } from '@constants/paths';

export const usePaymentResultModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedAddress = useAppSelector(selectSelectedAddress);
  const paymentResult = useAppSelector(selectPizzaPaymentResult);
  const totalPrice = useAppSelector(selectTotalPrice);
  const cartItems = useAppSelector(selectCartItems);

  const address = `${selectedAddress!.value}, кв ${selectedAddress!.apartment}`;

  const open = !!paymentResult;

  const onClose = () => {
    if (paymentResult?.success) {
      dispatch(clearCart());
      navigate(PATHS.index, { replace: true });
    }
    dispatch(setPizzaPaymentResult(null));
    dispatch(setPaymentStage('personDetails'));
  };

  const onClick = () => {
    navigate(PATHS.orders, { replace: true });
    dispatch(clearCart());
    dispatch(setPizzaPaymentResult(null));
    dispatch(setPaymentStage('personDetails'));
  };

  return { onClose, onClick, open, paymentResult, address, totalPrice, cartItems };
};
