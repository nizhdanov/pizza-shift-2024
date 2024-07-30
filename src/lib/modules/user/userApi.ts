import { baseApi } from '@/lib/redux';
import { USER_TOKEN_KEY } from '@constants/localStorage';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postSignIn: build.mutation<SignInResponse, SignInDto>({
      query: (dto) => ({
        url: 'users/signin',
        method: 'POST',
        data: dto
      })
    }),
    getSession: build.query<SignInResponse, void>({
      query: () => ({
        url: 'users/session',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`
        }
      })
    })
  })
});

export const { usePostSignInMutation } = userApi;
