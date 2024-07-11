export const calculatePizzaPrice = (
  size: PizzaSize,
  doughs: PizzaDough,
  toppings: PizzaIngredient[]
) => doughs.price + size.price + toppings.reduce((acc, curr) => acc + curr.cost, 0);
