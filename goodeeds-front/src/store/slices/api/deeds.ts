import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateDeedDto,
  Deed,
  DeedsWithPagination,
  DeedWithUser,
  PaginationProps,
  UpdateDeedDto,
} from '@/types';
import { createCustomBaseQuery } from './helpers/base-query';

export const DEEDS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/deeds/`;

export const deedsApi = createApi({
  reducerPath: 'deedsApi',
  baseQuery: createCustomBaseQuery(DEEDS_API_URL),
  tagTypes: ['UserDeeds', 'FriendsDeeds'],
  endpoints: (build) => ({
    getUserDeeds: build.query<DeedsWithPagination, PaginationProps>({
      query: ({ page = 1, limit }) => ({
        url: '',
        params: {
          page,
          limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'UserDeeds' as const, id })),
              { type: 'UserDeeds', id: 'LIST' },
            ]
          : [{ type: 'UserDeeds', id: 'LIST' }],
    }),
    getFriendsDeeds: build.query<DeedsWithPagination, PaginationProps>({
      query: ({ page = 1, limit }) => ({
        url: 'friends',
        params: {
          page,
          limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'FriendsDeeds' as const, id })),
              { type: 'FriendsDeeds', id: 'LIST' },
            ]
          : [{ type: 'FriendsDeeds', id: 'LIST' }],
    }),
    getDeedById: build.query<DeedWithUser, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'UserDeeds', id }],
    }),
    createDeed: build.mutation<Deed, CreateDeedDto>({
      query: (newDeed) => ({
        url: '',
        method: 'POST',
        body: newDeed,
      }),
      invalidatesTags: [{ type: 'UserDeeds', id: 'LIST' }],
    }),
    updateDeed: build.mutation<Deed, UpdateDeedDto>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'UserDeeds', id },
        { type: 'UserDeeds', id: 'LIST' },
      ],
    }),
    deleteDeed: build.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'UserDeeds', id },
        { type: 'UserDeeds', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetUserDeedsQuery,
  useGetFriendsDeedsQuery,
  useGetDeedByIdQuery,
  useCreateDeedMutation,
  useUpdateDeedMutation,
  useDeleteDeedMutation,
} = deedsApi;
