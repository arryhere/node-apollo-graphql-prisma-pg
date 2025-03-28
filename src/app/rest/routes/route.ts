import { Router } from 'express';
import { base_route } from './other/base.route.js';
import { health_route } from './other/health.route.js';

export const rest_router = Router({ caseSensitive: true, strict: true });

rest_router.use('/', base_route);
rest_router.use('/health', health_route);
