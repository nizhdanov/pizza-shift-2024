import { createBrowserRouter } from 'react-router-dom';

import { PizzasPage } from '@/app';
import { CartPage } from '@/app/cart';
import { PaymentPage } from '@/app/payment';
import { RootLayout } from '@/app/root-layout';
import { pizzaApi } from '@modules/pizza';

import { PATHS } from './constants/paths';
import { store } from './store';

export const router = createBrowserRouter([
  {
    path: PATHS.index,
    element: <RootLayout />,
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
      },
      {
        path: PATHS.payment,
        element: <PaymentPage />
      }
    ]
  }
]);
