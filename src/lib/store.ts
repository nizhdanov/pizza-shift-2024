import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { addressSlice } from '@modules/address';
import { cartSlice } from '@modules/cart';
import { mutationResultSlice } from '@modules/mutationResult';
import { selectedItemSlice } from '@modules/selectedItem';
import { stageSlice } from '@modules/stage';
import { sugestionSlice } from '@modules/sugestion';
import { userSlice } from '@modules/user';

import { baseApi } from './redux';

const rootReducer = combineSlices(
  baseApi,
  cartSlice,
  selectedItemSlice,
  userSlice,
  addressSlice,
  sugestionSlice,
  stageSlice,
  mutationResultSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});
