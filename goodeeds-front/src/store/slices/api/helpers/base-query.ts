import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createCustomBaseQuery = (baseUrl = '/', noRedirectRoutes = [] as string[]): BaseQueryFn => {
  const baseQueryWithAuth = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await baseQueryWithAuth(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      const endpoint = args?.url ?? args;

      if (noRedirectRoutes.some((route) => endpoint.includes(route))) {
        return result;
      } else {
        return {
          ...result,
          error: {
            ...result.error,
            redirect: true,
          },
        };
      }
    }

    return result;
  };
};
