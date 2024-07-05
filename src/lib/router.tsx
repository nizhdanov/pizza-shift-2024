import { createBrowserRouter } from 'react-router-dom';

import { PizzasPage } from '@/routes';
import { CartPage } from '@/routes/cart';
import { Root } from '@/routes/root';
import { pizzaApi } from '@modules/pizza';

import { PATHS } from './constants/paths';
import { store } from './store';

export const router = createBrowserRouter([
  {
    path: PATHS.index,
    element: <Root />,
    children: [
      {
        index: true,
        element: <PizzasPage />,
        loader: async () => {
          const result = store.dispatch(pizzaApi.endpoints.getPizzaCatalog.initiate());
          try {
            const response = await result.unwrap();
            return response;
          } catch (error) {
            console.error(error);
          } finally {
            result.unsubscribe();
          }
        }
      },
      {
        path: PATHS.cart,
        element: <CartPage />
      }
    ]
  }
]);
