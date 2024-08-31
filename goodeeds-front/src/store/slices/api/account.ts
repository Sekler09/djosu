import { createApi } from '@reduxjs/toolkit/query/react';
import { UpdateAccountDto, User } from '@/types';
import { authApi } from './auth';
import { createCustomBaseQuery } from './helpers/base-query';

const ACCOUNT_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/account/`;

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: createCustomBaseQuery(ACCOUNT_API_URL, ['me']),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => `me`,
      providesTags: ['User'],
    }),
    updateAccount: build.mutation<User, UpdateAccountDto>({
      query: (updateAccountDto) => ({
        url: '',
        method: 'PATCH',
        body: updateAccountDto,
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Update account error:', error);
        }
      },
    }),
    deleteAccount: build.mutation<void, void>({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Delete account error:', error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery, useDeleteAccountMutation, useUpdateAccountMutation } = accountApi;
