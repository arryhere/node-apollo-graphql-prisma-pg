import http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';

async function main() {
  try {
    const app = express();
    const http_server = http.createServer(app);

    const apollo_server = new ApolloServer({
      typeDefs: '',
      resolvers: {},
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http_server })],
    });

    await apollo_server.start();

    app.use(cors());
    app.use(express.json({ limit: '50mb', type: 'application/json' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true, type: 'application/x-www-form-urlencoded' }));
    app.use('/graphql', expressMiddleware(apollo_server, { context: async () => ({ mode: 'graphql' }) }));

    await new Promise<void>((resolve) => http_server.listen({ port: 4000 }, resolve));

    console.log('[graphql]: http://localhost:4000/graphql');
  } catch (error) {
    console.log('[Error]:', error);
  }
}

main();
