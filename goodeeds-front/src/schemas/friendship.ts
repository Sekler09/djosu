import { z } from 'zod';
import { UsernameSchema } from './account';

export const AddFriendFormSchema = z.object({
  username: UsernameSchema,
});
