import { USER_ADDRESS_KEY } from '@constants/localStorage';

import { createAppSlice } from '../redux';

const initialState = {
  addresses: [] as Address[],
  selectedAddress: null as Address | null
};

export const addressSlice = createAppSlice({
  name: 'address',
  initialState,
  selectors: {
    selectAddresses: (state) => state.addresses,
    selectSelectedAddress: (state) => state.selectedAddress
  },
  reducers: (create) => {
    return {
      addAddress: create.reducer<Address>((state, { payload }) => {
        let sameAddress = state.addresses.find(
          (item) => item.value === payload.value && item.apartment === payload.apartment
        );

        if (sameAddress) {
          sameAddress = payload;
        } else {
          state.addresses.push(payload);
          localStorage.setItem(USER_ADDRESS_KEY, JSON.stringify(state.addresses));
        }
      }),
      chooseAddress: create.reducer<Address>((state, { payload }) => {
        state.selectedAddress = payload;
      }),
      fillAddresses: create.reducer((state) => {
        const localAddresses = localStorage.getItem(USER_ADDRESS_KEY);
        if (localAddresses) {
          state.addresses = JSON.parse(localAddresses);
          state.selectedAddress = state.addresses[0];
        }
      }),
      removeAddress: create.reducer<string>((state, { payload }) => {
        const index = state.addresses.findIndex((item) => item.value === payload);
        state.addresses.splice(index, 1);
        if (state.addresses.length > 0) {
          localStorage.setItem(USER_ADDRESS_KEY, JSON.stringify(state.addresses));
        } else {
          localStorage.removeItem(USER_ADDRESS_KEY);
        }
      })
    };
  }
});

export const { selectAddresses, selectSelectedAddress } = addressSlice.selectors;

export const { addAddress, removeAddress, fillAddresses, chooseAddress } = addressSlice.actions;
