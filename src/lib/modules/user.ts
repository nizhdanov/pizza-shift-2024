import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  receiverAddress: PersonAddress;
  person: Person;
  debitCard: DebitCard;
}

const initialState: InitialState = {
  receiverAddress: {} as PersonAddress,
  person: {} as Person,
  debitCard: {} as DebitCard
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {},
  reducers: {
    fillPerson: (state, { payload }: PayloadAction<Person>) => {
      state.person = payload;
    },
    fillReceiverAddress: (state, { payload }: PayloadAction<PersonAddress>) => {
      state.receiverAddress = payload;
    },
    fillDebitCard: (state, { payload }: PayloadAction<DebitCard>) => {
      state.debitCard = payload;
    }
  }
});
