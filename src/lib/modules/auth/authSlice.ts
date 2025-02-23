import { createAppSlice } from '@/lib/redux';
import { USER_TOKEN_KEY } from '@constants/localStorage';

export type AuthStage = 'phone' | 'otp' | null;

const initialState = {
  stage: null as AuthStage,
  token: null as string | null
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectIsAuth: (state) => state.token !== null,
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
      }),
      setToken: create.reducer<string>((state, { payload }) => {
        localStorage.setItem(USER_TOKEN_KEY, payload);
        state.token = payload;
      }),
      removeToken: create.reducer((state) => {
        localStorage.removeItem(USER_TOKEN_KEY);
        state.token = null;
      })
    };
  }
});

export const { selectAuthStage, selectIsAuthModalOpen, selectIsAuth } = authSlice.selectors;

export const { setAuthStage, openAuthModal, closeAuthModal, setToken, removeToken } =
  authSlice.actions;
