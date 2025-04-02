import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './auth/auth.resolver.js';
import { HealthResolver } from './health/health.resolver.js';

export const typegraphqlSchema = await buildSchema({
  resolvers: [HealthResolver, AuthResolver],
  validate: true,
  emitSchemaFile: { path: path.join(process.cwd(), 'src', 'app', 'graphql', 'schema.graphql'), sortedSchema: true },
});
