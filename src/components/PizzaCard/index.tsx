import { useState } from 'react';

import { useAppDispatch } from '@/lib/store';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { type CartItem, cartSlice } from '@modules/cart';

import { PizzaCardDesktop } from './PizzaCardDesktop';
import { PizzaCardMobile } from './PizzaCardMobile';

interface PizzaCardProps {
  pizza: Pizza;
}

export const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const [open, setOpen] = useState(false);

  const isDesktop = useIsDesktop();

  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>(pizza.sizes[1]);
  const [selectedDough, setSelectedDough] = useState<PizzaDough>(pizza.doughs[0]);
  const [selectedToppings, setSelectedToppings] = useState<PizzaIngredient[]>([]);

  function addToCart(item: CartItem) {
    dispatch(cartSlice.actions.add(item));
  }

  function handleSelectTopping(topping: PizzaIngredient) {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings([...selectedToppings.filter((t) => t !== topping)]);
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  }

  // function handleClear() {
  //   setSelectedSize(pizza.sizes[1]);
  //   setSelectedDough(pizza.doughs[0]);
  //   setSelectedToppings([]);
  // }

  if (!isDesktop) {
    return (
      <PizzaCardMobile
        handleSelectTopping={handleSelectTopping}
        selectedDough={selectedDough}
        selectedSize={selectedSize}
        selectedToppings={selectedToppings}
        setSelectedDough={setSelectedDough}
        setSelectedSize={setSelectedSize}
        pizza={pizza}
        open={open}
        setOpen={setOpen}
        addToCart={addToCart}
      />
    );
  }

  return (
    <PizzaCardDesktop
      pizza={pizza}
      open={open}
      setOpen={setOpen}
      handleSelectTopping={handleSelectTopping}
      selectedDough={selectedDough}
      selectedSize={selectedSize}
      selectedToppings={selectedToppings}
      setSelectedDough={setSelectedDough}
      setSelectedSize={setSelectedSize}
      addToCart={addToCart}
    />
  );
};
