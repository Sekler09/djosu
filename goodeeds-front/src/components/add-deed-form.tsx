'use client';
import { FC, memo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddDeedFormSchema } from '@/schemas';
import { AddDeedFormData, DEED_TYPE_LABELS, DeedType } from '@/types';
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
import { useCreateDeedMutation } from '@/store/slices/api/deeds';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AddDeedFormProps {
  onAddDeed?: (data: AddDeedFormData) => void;
}

const AddDeedForm: FC<AddDeedFormProps> = ({ onAddDeed }) => {
  const [addDeed] = useCreateDeedMutation();
  const form = useForm<AddDeedFormData>({
    resolver: zodResolver(AddDeedFormSchema),
    defaultValues: {
      type: DeedType.VOLUNTEERING,
      content: '',
    },
  });

  const { control, handleSubmit, setError } = form;

  const handleFormSubmit = useCallback(
    async (data: AddDeedFormData) => {
      try {
        await addDeed(data).unwrap();
        if (onAddDeed) onAddDeed(data);
      } catch (err: unknown) {
        setError('root', {
          type: 'manual',
          message: 'Something went wrong. Try again later',
        });
      }
    },
    [addDeed, onAddDeed, setError],
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
                <SelectContent className="max-h-[40vh] overflow-y-auto">
                  <SelectGroup>
                    {Object.entries(DEED_TYPE_LABELS).map(([type, label]) => (
                      <SelectItem value={type} key={type}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
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

export default memo(AddDeedForm);
