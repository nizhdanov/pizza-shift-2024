import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './lib/router';
import { store } from './lib/store';

export const App = () => (
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
);
