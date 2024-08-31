import { Middleware } from '@reduxjs/toolkit';

interface CustomErrorPayload {
  redirect?: boolean;
}

interface RejectedAction {
  type: string;
  payload?: CustomErrorPayload;
}

export const redirectMiddleware: Middleware = () => (next) => (action) => {
  if (
    (action as RejectedAction).type.endsWith('/rejected') &&
    (action as RejectedAction)?.payload?.redirect
  ) {
    if (window.location.pathname !== '/') {
      window.location.href = '/?status=token-expired'};
  }
  return next(action);
};
