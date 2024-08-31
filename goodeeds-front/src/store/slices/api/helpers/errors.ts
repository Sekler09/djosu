import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryErrorWithData = <DataType>(
  error: unknown,
): error is FetchBaseQueryError & { data: DataType } =>
  typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
