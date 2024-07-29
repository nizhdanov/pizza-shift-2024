import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { decrease, increase, remove, selectCartItems, selectTotalPrice } from '@modules/cart';
import { useGetPizzaByIdResult } from '@modules/pizza';
import { chooseCartPizza } from '@modules/selectedItem';

export const useCartPage = (pizzaId?: string) => {
  const dispatch = useAppDispatch();

  const { pizza } = useGetPizzaByIdResult(pizzaId!);

  const cart = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const openModal = (uid: string) => {
    dispatch(chooseCartPizza(uid));
  };

  const decreaseCount = (uid: string) => {
    dispatch(decrease(uid));
  };

  const increaseCount = (uid: string) => {
    dispatch(increase(uid));
  };

  const removeItem = (uid: string) => {
    dispatch(remove(uid));
  };

  return {
    pizza,
    cart,
    totalPrice,
    openModal,
    decreaseCount,
    increaseCount,
    removeItem
  };
};
