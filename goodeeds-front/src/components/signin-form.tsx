'use client';
import { FC, memo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignInFormData } from '@/types';
import { SignInFormSchema } from '@/schemas';
import { useSignInMutation } from '@/store/slices/api/auth';
import { isFetchBaseQueryErrorWithData } from '@/store/slices/api/helpers/errors';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = () => {
  const [signIn] = useSignInMutation();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { control, handleSubmit, setError } = form;

  const handleFormSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn(data).unwrap();
      } catch (err) {
        if (isFetchBaseQueryErrorWithData(err)) {
          setError('root', {
            type: 'manual',
            message: 'Invalid username or password. Please try again.',
          });
        } else {
          setError('root', {
            type: 'server',
            message: 'Server is unavalibale. Try agail later.',
          });
        }
      }
    },
    [signIn, setError],
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
        <FormRootError />
        <Button type="submit">Go</Button>
      </form>
    </Form>
  );
};

export default memo(SignInForm);
