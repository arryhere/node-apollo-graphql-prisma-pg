import type { Request } from 'express';

export interface ApolloGraphqlContext {
  req: Request;
  api: string;
}
