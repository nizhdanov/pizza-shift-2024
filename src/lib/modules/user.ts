import { createAppSlice } from '../redux';

const initialState = {
  person: {} as PersonalData,
  debitCard: {} as DebitCard
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  selectors: {
    selectPerson: (state) => state.person
  },
  reducers: (create) => {
    return {
      fillPerson: create.reducer<PersonalData>((state, { payload }) => {
        state.person = payload;
      }),

      fillDebitCard: create.reducer<DebitCard>((state, { payload }) => {
        state.debitCard = payload;
      })
    };
  }
});

export const { selectPerson } = userSlice.selectors;

export const { fillDebitCard, fillPerson } = userSlice.actions;
