import { useAppDispatch, useAppSelector } from '@/lib/store';
import { cartSlice } from '@modules/cart';
import { selectedItemSlice } from '@modules/selectedItem';

export const usePizzaModal = () => {
  const dispatch = useAppDispatch();

  const open = useAppSelector(selectedItemSlice.selectors.selectIsOpened);
  const pizza = useAppSelector((state) => state.selectedItem.value);
  const uid = useAppSelector((state) => state.selectedItem.uid);
  const count = useAppSelector((state) => state.selectedItem.count);
  const selectedSize = useAppSelector((state) => state.selectedItem.size);
  const selectedDough = useAppSelector((state) => state.selectedItem.doughs);
  const selectedToppings = useAppSelector((state) => state.selectedItem.toppings);

  const clear = () => {
    dispatch(selectedItemSlice.actions.clear());
  };

  const selectSize = (size: PizzaSize) => {
    dispatch(selectedItemSlice.actions.selectSize(size));
  };

  const selectDough = (dough: PizzaDough) => {
    dispatch(selectedItemSlice.actions.selectDough(dough));
  };

  const selectTopping = (topping: PizzaIngredient) => {
    dispatch(selectedItemSlice.actions.selectTopping(topping));
  };

  const addToCart = () => {
    dispatch(
      cartSlice.actions.add({
        value: pizza,
        count: count === 0 ? 1 : count,
        doughs: selectedDough,
        size: selectedSize,
        toppings: selectedToppings,
        uid: uid
      })
    );
    clear();
  };

  return {
    open,
    clear,
    addToCart,
    selectSize,
    selectDough,
    selectTopping,
    pizza,
    selectedToppings,
    selectedDough,
    selectedSize
  };
};
