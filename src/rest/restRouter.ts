import { Router } from 'express';
import { base_route } from './routes/base.route.js';
import { health_route } from './routes/health.route.js';

export const restRouter = Router({ caseSensitive: true, strict: true });

restRouter.use('/', base_route);
restRouter.use('/health', health_route);
