import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './auth/auth.resolver.js';
import { HealthResolver } from './health/health.resolver.js';
import { graphqlAuthChecker } from './lib/graphqlAuthChecker.lib.js';

export const typegraphqlSchema = await buildSchema({
  resolvers: [HealthResolver, AuthResolver],
  validate: true,
  authChecker: graphqlAuthChecker,
  emitSchemaFile: { path: path.join(process.cwd(), 'src', 'graphql', 'schema.graphql'), sortedSchema: true },
});
