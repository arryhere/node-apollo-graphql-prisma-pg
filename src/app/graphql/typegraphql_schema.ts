import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { HealthResolver } from './health/health.resolver.js';

export const typegraphql_schema = await buildSchema({
  resolvers: [HealthResolver],
  container: Container,
  emitSchemaFile: { path: 'src/app/graphql/schema.graphql', sortedSchema: true },
});
