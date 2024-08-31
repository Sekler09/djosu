import { createApi } from '@reduxjs/toolkit/query/react';
import { FriendshipWithUsers, User } from '@/types';
import { deedsApi } from './deeds';
import { createCustomBaseQuery } from './helpers/base-query';

const FRIENDSHIP_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/friendship/`;

export const friendshipApi = createApi({
  reducerPath: 'friendshipApi',
  baseQuery: createCustomBaseQuery(FRIENDSHIP_API_URL),
  tagTypes: ['Friendship', 'PendingRequests'],
  endpoints: (build) => ({
    sendFriendRequest: build.mutation<void, string>({
      query: (username) => ({
        url: `request/${username}`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingRequests'],
    }),
    acceptFriendRequest: build.mutation<void, number>({
      query: (id) => ({
        url: `accept/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Friendship', 'PendingRequests'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(deedsApi.util.invalidateTags(['FriendsDeeds']));
        } catch (error) {
          console.error('Sign up error:', error);
        }
      },
    }),
    rejectFriendRequest: build.mutation<void, number>({
      query: (id) => ({
        url: `reject/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingRequests'],
    }),
    getFriends: build.query<User[], void>({
      query: () => `friends`,
      providesTags: ['Friendship'],
    }),
    getPendingRequests: build.query<FriendshipWithUsers[], void>({
      query: () => `requests`,
      providesTags: ['PendingRequests'],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetPendingRequestsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
} = friendshipApi;
