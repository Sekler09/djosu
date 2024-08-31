'use client';
import { FC, memo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UpdatePasswordFormData } from '@/types';
import { UpdatePasswordFormSchema } from '@/schemas';
import { useUpdateAccountMutation } from '@/store/slices/api/account';
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
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';

interface UpdatePasswordFormProps {}

const UpdatePasswordForm: FC<UpdatePasswordFormProps> = () => {
  const { toast } = useToast();
  const [updatePassword, { isLoading }] = useUpdateAccountMutation();
  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: '',
    },
  });

  const { handleSubmit, control, setError } = form;

  const handleFormSubmit = useCallback(
    async (data: UpdatePasswordFormData) => {
      try {
        await updatePassword({ password: data.password }).unwrap();
        toast({
          title: 'Successfully changed the password',
          variant: 'success',
        });
      } catch (err) {
        if (isFetchBaseQueryErrorWithData<{ message: string }>(err) && err?.data?.message) {
          setError('root', { message: err?.data?.message });
        }
      }
    },
    [updatePassword, setError, toast],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex w-full max-w-[20rem] flex-1 flex-col space-y-6"
      >
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter new password" {...field} type="password" />
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
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input placeholder="Condirm new password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormRootError />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Spinner size={20} />}Save
        </Button>
      </form>
    </Form>
  );
};

export default memo(UpdatePasswordForm);
