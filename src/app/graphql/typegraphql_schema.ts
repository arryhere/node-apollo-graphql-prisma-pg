import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { HealthResolver } from './health/health.resolver.js';

export const typegraphql_schema = await buildSchema({
  resolvers: [HealthResolver],
  container: Container,
  emitSchemaFile: { path: path.join(process.cwd(), 'src', 'app', 'graphql', 'schema.graphql'), sortedSchema: true },
});
