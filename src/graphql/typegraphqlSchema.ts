import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { APP_ENUM } from '../common/enum/appEnum.js';
import { config } from '../config/config.js';
import { graphqlAuthChecker } from './lib/graphqlAuthChecker.lib.js';
import { AuthResolver } from './module/auth/auth.resolver.js';
import { HealthResolver } from './module/health/health.resolver.js';
import { UserResolver } from './module/user/user.resolver.js';

export const typegraphqlSchema = buildSchema({
  resolvers: [HealthResolver, AuthResolver, UserResolver],
  validate: true,
  authChecker: graphqlAuthChecker,
  emitSchemaFile:
    config.app.APP_ENV !== APP_ENUM.APP_ENV.PROD
      ? {
          path: path.join(process.cwd(), 'src', 'graphql', 'schema.graphql'),
          sortedSchema: true,
        }
      : undefined,
});
