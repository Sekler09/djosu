import { z } from 'zod';
import { DeedType } from '@/types';

export const AddDeedFormSchema = z.object({
  type: z.nativeEnum(DeedType),
  content: z.string().trim().min(10, 'Content must be at least 10 characters'),
});

export const EditDeedFormSchema = AddDeedFormSchema.extend({});
