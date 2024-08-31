import { createApi } from '@reduxjs/toolkit/query/react';
import { AccountDto } from '@/types';
import { accountApi } from './account';
import { createCustomBaseQuery } from './helpers/base-query';

const AUTH_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createCustomBaseQuery(AUTH_API_URL, ['sign-in', 'sign-up']),
  tagTypes: ['User'],
  endpoints: (build) => ({
    signIn: build.mutation<void, AccountDto>({
      query: (body) => ({
        url: `sign-in`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Sign in error:', error);
        }
      },
    }),
    signUp: build.mutation<void, AccountDto>({
      query: (body) => ({
        url: `sign-up`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(['User']));
        } catch (error) {
          console.error('Sign up error:', error);
        }
      },
    }),
    signOut: build.mutation<void, void>({
      query: () => ({
        url: `sign-out`,
        method: 'POST',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          window.location.href = '/'
        } catch (error) {
          console.error('Sign out error:', error);
        }
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = authApi;
