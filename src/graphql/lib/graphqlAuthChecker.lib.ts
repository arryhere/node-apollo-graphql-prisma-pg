import jwt from 'jsonwebtoken';
import type { AuthChecker } from 'type-graphql';
import { config } from '../../config/config.js';
import { prisma } from '../../db/prisma.js';
import type { ApolloGraphqlContext } from '../interface/apolloGraphqlContext.interface.js';

export const graphqlAuthChecker: AuthChecker<ApolloGraphqlContext> = async ({ root, args, context, info }, roles) => {
  const authorization = context.req.headers.authorization;
  if (!authorization) return false;
  if (!authorization.startsWith('Bearer ')) return false;

  const token = authorization.substring(7);
  const { email } = jwt.verify(token, config.jwtSecret.JWT_ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
  if (!email) return false;

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) return false;

  context.user = user;

  return true;
};
