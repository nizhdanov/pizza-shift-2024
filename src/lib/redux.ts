import { useDispatch, useSelector } from 'react-redux';
import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { BASE_URL } from '@constants/baseUrl';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: `${baseUrl}/${url}`,
        method,
        data,
        params,
        headers
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };

export const baseApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({})
});

export const createAppSelector = createDraftSafeSelector.withTypes<RootState>();
