import { baseApi } from '../redux';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postAuthOtp: build.mutation<AuthOtpResponse, CreateOtpDto>({
      query: (dto) => ({
        url: 'auth/otp',
        method: 'POST',
        body: dto
      })
    })
  })
});

export const { usePostAuthOtpMutation } = authApi;
