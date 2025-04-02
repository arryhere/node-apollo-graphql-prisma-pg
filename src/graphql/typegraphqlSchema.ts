import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { graphqlAuthChecker } from './lib/graphqlAuthChecker.lib.js';
import { AuthResolver } from './module/auth/auth.resolver.js';
import { HealthResolver } from './module/health/health.resolver.js';
import { UserResolver } from './module/user/user.resolver.js';

export const typegraphqlSchema = await buildSchema({
  resolvers: [HealthResolver, AuthResolver, UserResolver],
  validate: true,
  authChecker: graphqlAuthChecker,
  emitSchemaFile: { path: path.join(process.cwd(), 'src', 'graphql', 'schema.graphql'), sortedSchema: true },
});
