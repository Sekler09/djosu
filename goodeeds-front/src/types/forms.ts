import { z } from 'zod';
import {
  AddDeedFormSchema,
  EditDeedFormSchema,
  SignInFormSchema,
  SignUpFormSchema,
  UpdatePasswordFormSchema,
  UpdateUsernameFormSchema,
  AddFriendFormSchema,
} from '@/schemas';

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;
export type SignInFormData = z.infer<typeof SignInFormSchema>;
export type UpdateUsernameFormData = z.infer<typeof UpdateUsernameFormSchema>;
export type UpdatePasswordFormData = z.infer<typeof UpdatePasswordFormSchema>;
export type AddDeedFormData = z.infer<typeof AddDeedFormSchema>;
export type EditDeedFormData = z.infer<typeof EditDeedFormSchema>;
export type AddFriendFormData = z.infer<typeof AddFriendFormSchema>;
