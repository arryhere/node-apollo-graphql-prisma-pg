import type { GraphQLRequest } from '@apollo/server';
import type { DocumentNode } from 'graphql';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';
import { config } from '../../config/config.js';
import { typegraphqlSchema } from '../typegraphqlSchema.js';

export const graphqlQueryComplexity = {
  requestDidStart: async () => ({
    async didResolveOperation({ request, document }: { request: GraphQLRequest; document: DocumentNode }) {
      const complexity = getComplexity({
        schema: typegraphqlSchema,
        operationName: request.operationName,
        query: document,
        variables: request.variables,
        estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
      });

      if (complexity > config.graphql.GRAPHQL_QUERY_COMPLEXITY) {
        throw new Error(
          `Sorry, too complicated query! ${complexity} exceeded the maximum allowed complexity of ${config.graphql.GRAPHQL_QUERY_COMPLEXITY}`
        );
      }
      console.log('[Graphql Query Complexity]:', { Operation: request.operationName, Complexity: complexity });
    },
  }),
};
