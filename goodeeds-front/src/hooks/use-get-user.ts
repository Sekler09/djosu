import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '@/store/slices/api/account';
import { clearUser, setUser } from '@/store/slices/user';

export const useGetUser = () => {
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetMeQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
    if (error) {
      dispatch(clearUser());
    }
  }, [data, error, dispatch]);

  return { user: error ? null : data, error, isLoading: isFetching };
};
