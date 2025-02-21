import { createAppSlice } from '@/lib/redux';

export type AuthStage = 'phone' | 'otp' | null;

const initialState = {
  stage: null as AuthStage
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectAuthStage: (state) => state.stage,
    selectIsAuthModalOpen: (state) => state.stage !== null
  },
  reducers: (create) => {
    return {
      setAuthStage: create.reducer<AuthStage>((state, { payload }) => {
        state.stage = payload;
      }),
      openAuthModal: create.reducer((state) => {
        state.stage = 'phone';
      }),
      closeAuthModal: create.reducer((state) => {
        state.stage = null;
      })
    };
  }
});

export const { selectAuthStage, selectIsAuthModalOpen } = authSlice.selectors;

export const { setAuthStage, openAuthModal, closeAuthModal } = authSlice.actions;
