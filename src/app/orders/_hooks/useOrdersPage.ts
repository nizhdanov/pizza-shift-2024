import { useGetPizzaOrdersQuery } from '@modules/pizza';

export const useOrdersPage = () => {
  const pizzaOrdersQuery = useGetPizzaOrdersQuery();
  return { pizzaOrdersQuery };
};
