import { User } from '@prisma/client';
import { Request } from 'express';

export const extractUserFromRequest = (req: Request) => {
  return req['user'] as Pick<User, 'username' | 'id'>;
};
