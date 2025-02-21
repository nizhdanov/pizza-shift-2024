import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { addressSlice } from '@modules/address';
import { authSlice } from '@modules/auth';
import { cartSlice } from '@modules/cart';
import { pizzaSlice } from '@modules/pizza';
import { selectedItemSlice } from '@modules/selectedItem';
import { suggestionSlice } from '@modules/suggestion';
import { userSlice } from '@modules/user';

import { baseApi } from './redux';

const rootReducer = combineSlices(
  baseApi,
  cartSlice,
  selectedItemSlice,
  userSlice,
  addressSlice,
  suggestionSlice,
  pizzaSlice,
  authSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});
