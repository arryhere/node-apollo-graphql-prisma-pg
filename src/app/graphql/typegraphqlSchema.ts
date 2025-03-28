import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { HealthResolver } from './health/health.resolver.js';
import { AuthResolver } from './auth/auth.resolver.js';

export const typegraphqlSchema = await buildSchema({
  resolvers: [HealthResolver, AuthResolver],
  emitSchemaFile: { path: path.join(process.cwd(), 'src', 'app', 'graphql', 'schema.graphql'), sortedSchema: true },
});
