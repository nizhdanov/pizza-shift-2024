import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/root-layout';
import { AuthWrapper } from '@/components/AuthWrapper';

import { PATHS } from './constants/paths';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: PATHS.index,
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
        element: <AuthWrapper redirectTo={PATHS.index} />,
        children: [
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
            path: PATHS.profile,
            async lazy() {
              const { ProfilePage } = await import('@/app/profile');
              return {
                Component: ProfilePage
              };
            }
          }
        ]
      }
    ]
  }
]);
