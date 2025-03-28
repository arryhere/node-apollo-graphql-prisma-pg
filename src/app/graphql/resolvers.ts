import { buildSchema } from 'type-graphql';
import { Container } from 'typedi'; // ✅ Correct import
import { HealthResolver } from './health/health.resolver.js';

export const typegraphql_schema = await buildSchema({
  resolvers: [HealthResolver],
  container: Container,
  emitSchemaFile: {path: 'src/app/graphql/schema.graphql', sortedSchema: true},
});