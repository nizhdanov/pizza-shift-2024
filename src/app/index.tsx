import { useGetPizzaCatalogQuery } from '@modules/pizza';

import { CartButton } from './_components/CartButton';
import { PizzaCard } from './_components/PizzaCard';

export const PizzasPage = () => {
  const pizzaCatalogQuery = useGetPizzaCatalogQuery();

  return (
    <main className='container mt-6 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-x-8 md:gap-y-12'>
      {pizzaCatalogQuery.data?.catalog.map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />)}
      <CartButton />
    </main>
  );
};
