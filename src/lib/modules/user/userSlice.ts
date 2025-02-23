import { createAppSlice } from '@/lib/redux';

const initialState = {
  person: {} as PersonalData,
  debitCard: {} as DebitCard
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  selectors: {
    selectPerson: (state) => state.person,
    selectPhone: (state) => state.person.phone
  },
  reducers: (create) => {
    return {
      fillPerson: create.reducer<PersonalData>((state, { payload }) => {
        state.person = payload;
      }),

      fillDebitCard: create.reducer<DebitCard>((state, { payload }) => {
        state.debitCard = payload;
      }),

      updatePhone: create.reducer<string>((state, { payload }) => {
        state.person.phone = payload;
      }),

      clearUser: create.reducer(() => initialState)
    };
  }
});

export const { selectPerson, selectPhone } = userSlice.selectors;

export const { fillDebitCard, fillPerson, clearUser, updatePhone } = userSlice.actions;
