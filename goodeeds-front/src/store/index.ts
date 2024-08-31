import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/user';
import { authApi } from './slices/api/auth';
import { accountApi } from './slices/api/account';
import { deedsApi } from './slices/api/deeds';
import { friendshipApi } from './slices/api/friendship';
import { redirectMiddleware } from './middlewares';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [deedsApi.reducerPath]: deedsApi.reducer,
    [friendshipApi.reducerPath]: friendshipApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      accountApi.middleware,
      deedsApi.middleware,
      friendshipApi.middleware,
      redirectMiddleware,
    ),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
