import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { add, update } from '@modules/cart';
import { useGetPizzaByIdResult } from '@modules/pizza';
import {
  chooseDough,
  chooseSize,
  chooseTopping,
  clear,
  selectDoughs,
  selectPizzaId,
  selectSize,
  selectToppings,
  selectUid
} from '@modules/selectedItem';

export const usePizzaModal = () => {
  const dispatch = useAppDispatch();

  const uid = useAppSelector(selectUid);
  const selectedPizzaId = useAppSelector(selectPizzaId);
  const selectedSize = useAppSelector(selectSize);
  const selectedDough = useAppSelector(selectDoughs);
  const selectedToppings = useAppSelector(selectToppings);

  const { pizza } = useGetPizzaByIdResult(selectedPizzaId!);

  const open = !!selectedPizzaId;

  const changeSize = (size: PizzaSize) => {
    dispatch(chooseSize(size));
  };
  const changeDough = (dough: PizzaDough) => {
    dispatch(chooseDough(dough));
  };
  const changeTopping = (topping: PizzaIngredient) => {
    dispatch(chooseTopping(topping));
  };

  const onClose = () => {
    dispatch(clear());
  };

  const updateItem = () => {
    dispatch(update());
    onClose();
  };

  const addItem = () => {
    dispatch(add());
    onClose();
  };

  return {
    pizza,
    uid,
    open,
    onClose,
    changeSize,
    changeDough,
    changeTopping,
    selectedToppings,
    selectedDough,
    selectedSize,
    updateItem,
    addItem
  };
};
