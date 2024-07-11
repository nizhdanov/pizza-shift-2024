import { useAppDispatch, useAppSelector } from '@/lib/store';
import { cartSlice } from '@modules/cart';
import { selectedItemSlice } from '@modules/selectedItem';

export const useCartPage = () => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(cartSlice.selectors.cartItems);
  const totalPrice = useAppSelector(cartSlice.selectors.totalPrice);

  const openModal = (cartItem: CartItem) => {
    dispatch(selectedItemSlice.actions.selectFromCart(cartItem));
  };

  const decreaseCount = (uid: number) => {
    dispatch(cartSlice.actions.decrease(uid));
  };

  const increaseCount = (uid: number) => {
    dispatch(cartSlice.actions.increase(uid));
  };

  const removeItem = (uid: number) => {
    dispatch(cartSlice.actions.remove(uid));
  };

  return {
    cart,
    totalPrice,
    openModal,
    decreaseCount,
    increaseCount,
    removeItem
  };
};
