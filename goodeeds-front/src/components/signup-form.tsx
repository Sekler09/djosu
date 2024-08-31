'use client';
import { FC, memo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignUpFormData } from '@/types';
import { SignUpFormSchema } from '@/schemas';
import { useSignUpMutation } from '@/store/slices/api/auth';
import { isFetchBaseQueryErrorWithData } from '@/store/slices/api/helpers/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from '@/components/ui/form';

interface SignUpFormProps {}

const SignUpForm: FC<SignUpFormProps> = () => {
  const [signUp] = useSignUpMutation();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control, handleSubmit, setError } = form;

  const handleFormSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        await signUp(data).unwrap();
      } catch (err: unknown) {
        if (isFetchBaseQueryErrorWithData<{ username: string }>(err)) {
          if (err?.data?.username) {
            setError('username', { type: 'server', message: err.data.username });
          } else {
            setError('root', {
              type: 'manual',
              message: 'Invalid username or password. Please try again.',
            });
          }
        } else
          setError('root', {
            type: 'manual',
            message: 'Something went wrong. Try again later',
          });
      }
    },
    [signUp, setError],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex w-full max-w-[20rem] flex-1 flex-col space-y-6"
      >
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Condirm your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormRootError />
        <Button type="submit">Go</Button>
      </form>
    </Form>
  );
};

export default memo(SignUpForm);
