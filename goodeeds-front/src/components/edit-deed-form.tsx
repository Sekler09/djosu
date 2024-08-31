'use client';
import { FC, memo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EditDeedFormData, DEED_TYPE_LABELS, DeedType, DeedWithUser } from '@/types';
import { EditDeedFormSchema } from '@/schemas';
import { useUpdateDeedMutation } from '@/store/slices/api/deeds';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface EditDeedFormProps {
  deed: DeedWithUser;
  onEditDeed?: (data: EditDeedFormData) => void;
}

const EditDeedForm: FC<EditDeedFormProps> = ({ onEditDeed, deed }) => {
  const [editDeed] = useUpdateDeedMutation();
  const form = useForm<EditDeedFormData>({
    resolver: zodResolver(EditDeedFormSchema),
    defaultValues: {
      type: deed.type,
      content: deed.content,
    },
  });

  const { setError, control, handleSubmit } = form;

  const handleFormSubmit = useCallback(
    async (data: EditDeedFormData) => {
      try {
        await editDeed({ id: deed.id, ...data }).unwrap();
        if (onEditDeed) onEditDeed(data);
      } catch (err: unknown) {
        setError('root', {
          type: 'manual',
          message: 'Something went wrong. Try again later',
        });
      }
    },
    [editDeed, onEditDeed, deed.id, setError],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex w-full flex-1 flex-col space-y-6"
      >
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem className="max-w-[30rem]">
              <FormLabel>Type of good deed</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={DeedType.VOLUNTEERING}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select which deed you did" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(DEED_TYPE_LABELS).map(([type, label]) => (
                    <SelectItem value={type} key={type}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem className="max-w-[30rem]">
              <FormLabel>Tell us more about deed you did</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormRootError />
        <Button type="submit" className="self-end text-white">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default memo(EditDeedForm);
