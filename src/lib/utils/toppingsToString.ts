import { TOPPING_MAP } from '@constants/map';

export const toppingsToString = (toppings: CartPizza['toppings']) => {
  if (toppings.length > 0) {
    const tops = toppings
      .map((topping) => TOPPING_MAP[topping.name])
      .join(', ')
      .toLowerCase();
    return `+ ${tops}`;
  }
  return '';
};
