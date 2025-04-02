import { Router } from 'express';
import { base_route } from './other/base.route.js';
import { health_route } from './other/health.route.js';

export const restRouter = Router({ caseSensitive: true, strict: true });

restRouter.use('/', base_route);
restRouter.use('/health', health_route);
