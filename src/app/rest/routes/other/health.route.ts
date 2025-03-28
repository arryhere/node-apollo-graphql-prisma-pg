import { type NextFunction, type Request, type Response, Router } from 'express';

export const health_route = Router({ caseSensitive: true, strict: true });

health_route.get('/', [], (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ success: true, api: 'rest', message: 'rest health check', data: {} });
});
