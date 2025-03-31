// import 'core-js/features/reflect'; // use this or reflect-metadata
import 'reflect-metadata';
import http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { typegraphqlSchema } from './app/graphql/typegraphqlSchema.js';
import { restRouter } from './app/rest/routes/route.js';
import { config } from './config/config.js';

async function main() {
  try {
    const port = config.app.APP_PORT;
    const app = express();
    const http_server = http.createServer(app);

    /* apollo server */
    const apolloServer = new ApolloServer({
      schema: typegraphqlSchema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http_server })],
    });
    await apolloServer.start();

    /* middlewares */
    app.use(cors());
    app.use(express.json({ limit: '50mb', type: 'application/json' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true, type: 'application/x-www-form-urlencoded' }));

    /* api */
    app.get('/', (req: Request, res: Response, next: NextFunction) => res.status(200).send('root'));
    app.use('/rest', restRouter);
    app.use('/graphql', expressMiddleware(apolloServer, { context: async () => ({ api: 'graphql' }) }));
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
