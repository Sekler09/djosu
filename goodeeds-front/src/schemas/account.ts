import { z } from 'zod';

export const PasswordSchema = z
  .string()
  .trim()
  .min(8, 'Password must be at least 8 characters')
  .regex(/(?=.*[a-z])/, { message: 'Password must have at least one lowercase letter' })
  .regex(/(?=.*[A-Z])/, { message: 'Password must have at least one uppercase letter' })
  .regex(/(?=.*\d)/, { message: 'Password must have at least one digit' })
  .regex(/(?=.*[@$!%*?&])/, { message: 'Password must have at least one special symbol' });

export const UsernameSchema = z
  .string()
  .trim()
  .min(5, {
    message: 'Username must be at least 5 characters.',
  })
  .max(15, { message: 'Username must be less than 16 characters.' })
  .regex(/^\S+$/, { message: 'Username must not have spaces' });

export const SignUpFormSchema = z
  .object({
    password: PasswordSchema,
    username: UsernameSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  });

export const SignInFormSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'Required',
  }),
  password: z.string().trim().min(1, {
    message: 'Required',
  }),
});

export const UpdateUsernameFormSchema = z.object({
  username: UsernameSchema,
});

export const UpdatePasswordFormSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  });
