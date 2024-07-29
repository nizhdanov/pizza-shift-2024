import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/root-layout';

import { PATHS } from './constants/paths';

export const router = createBrowserRouter([
  {
    path: PATHS.index,
    element: <RootLayout />,
    children: [
      {
        index: true,
        async lazy() {
          const { PizzasPage } = await import('@/app/index');
          return {
            Component: PizzasPage
          };
        }
      },
      {
        path: PATHS.cart,
        async lazy() {
          const { CartPage } = await import('@/app/cart');
          return {
            Component: CartPage
          };
        }
      },
      {
        path: PATHS.payment,
        async lazy() {
          const { PaymentPage } = await import('@/app/payment');
          return {
            Component: PaymentPage
          };
        }
      },
      {
        path: PATHS.orders,
        async lazy() {
          const { OrdersPage } = await import('@/app/orders');
          return {
            Component: OrdersPage
          };
        }
      },
      {
        path: PATHS.signin,
        async lazy() {
          const { SignInPage } = await import('@/app/signin');
          return {
            Component: SignInPage
          };
        }
      }
    ]
  }
]);
