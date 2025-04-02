import type { User } from '@prisma/client';
import type { Request } from 'express';

export interface ApolloGraphqlContext {
  req: Request;
  api: string;
  user?: User;
}
