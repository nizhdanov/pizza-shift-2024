export const calculatePizzaPrice = (pizza: Omit<CartPizza, 'description' | 'name' | 'id'>) =>
  pizza.doughs.price + pizza.size.price + pizza.toppings.reduce((acc, curr) => acc + curr.cost, 0);
