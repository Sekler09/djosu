'use client';
import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UpdateUsernameFormData } from '@/types';
import { UpdateUsernameFormSchema } from '@/schemas';
import { selectUser } from '@/store/selectors/user';
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

interface UpdateUsernameFormProps {}

const UpdateUsernameForm: FC<UpdateUsernameFormProps> = () => {
  const user = useSelector(selectUser);
  const { toast } = useToast();
  const [updateUsername, { isLoading }] = useUpdateAccountMutation();
  const form = useForm<UpdateUsernameFormData>({
    resolver: zodResolver(UpdateUsernameFormSchema),
    defaultValues: {
      username: user?.username,
    },
  });

  const { handleSubmit, control, setError } = form;

  const handleFormSubmit = useCallback(
    async (data: UpdateUsernameFormData) => {
      const prevUsername = user?.username;
      try {
        await updateUsername(data).unwrap();
        toast({
          title: 'Successfully changed the usernmae',
          description: `You've just changed your username from ${prevUsername} to ${data.username}`,
          variant: 'success',
        });
      } catch (err) {
        if (isFetchBaseQueryErrorWithData<{ message: string }>(err) && err?.data?.message) {
          setError('root', { message: err?.data?.message });
        }
      }
    },
    [updateUsername, setError, user?.username, toast],
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
              <FormLabel>New Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
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

export default memo(UpdateUsernameForm);
