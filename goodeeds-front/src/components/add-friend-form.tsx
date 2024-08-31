'use client';
import { FC, memo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddFriendFormData } from '@/types';
import { AddFriendFormSchema } from '@/schemas/friendship';
import { isFetchBaseQueryErrorWithData } from '@/store/slices/api/helpers/errors';
import { useSendFriendRequestMutation } from '@/store/slices/api/friendship';
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

interface AddFriendFormProps {
  onAddFriend: (data: AddFriendFormData) => void;
}

const AddFriendForm: FC<AddFriendFormProps> = ({ onAddFriend }) => {
  const [addFriend] = useSendFriendRequestMutation();
  const form = useForm<AddFriendFormData>({
    resolver: zodResolver(AddFriendFormSchema),
    defaultValues: {
      username: '',
    },
  });

  const { control, handleSubmit, setError } = form;

  const handleFormSubmit = useCallback(
    async (data: AddFriendFormData) => {
      try {
        await addFriend(data.username).unwrap();
        onAddFriend(data);
      } catch (err) {
        if (isFetchBaseQueryErrorWithData<{ message: string }>(err)) {
          setError('root', {
            type: 'manual',
            message: err.data?.message ?? 'Something went wrong',
          });
        } else {
          setError('root', {
            type: 'server',
            message: 'Server is unavalibale. Try agail later.',
          });
        }
      }
    },
    [addFriend, onAddFriend, setError],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex w-full flex-1 flex-col space-y-6 md:max-w-[20rem]"
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
        <FormRootError />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};

export default memo(AddFriendForm);
