// import 'core-js/features/reflect'; // use this or reflect-metadata
import 'reflect-metadata';
import http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { config } from './config/config.js';
import { graphqlQueryComplexity } from './graphql/lib/graphqlQueryComplexity.lib.js';
import { typegraphqlSchema } from './graphql/typegraphqlSchema.js';
import { restRouter } from './rest/routes/route.js';

async function main() {
  try {
    const port = config.app.APP_PORT;
    const app = express();
    const http_server = http.createServer(app);

    /* apollo server */
    const apolloServer = new ApolloServer({
      schema: typegraphqlSchema,

      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http_server }), graphqlQueryComplexity],
    });
    await apolloServer.start();

    /* middlewares */
    app.use(cors());
    app.use(express.json({ limit: '50mb', type: 'application/json' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true, type: 'application/x-www-form-urlencoded' }));
    app.use(graphqlUploadExpress({ maxFileSize: 1 * 1024 * 1024, maxFiles: 5 }));

    /* api */
    app.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).send('root'));
    app.use('/rest', restRouter);
    app.use(
      '/graphql',
      expressMiddleware(apolloServer, { context: async ({ req }) => ({ req: req, api: 'graphql' }) })
    );
    app.use((req: Request, res: Response, next: NextFunction) => res.status(404).send('Page Not Found'));

    /* start */
    await new Promise<void>((resolve) => http_server.listen({ port: port }, resolve));

    console.log(`[rest]: http://localhost:${port}/rest/`);
    console.log(`[graphql]: http://localhost:${port}/graphql/`);
  } catch (error) {
    console.log('[Error]:', error);
  }
}

main();
