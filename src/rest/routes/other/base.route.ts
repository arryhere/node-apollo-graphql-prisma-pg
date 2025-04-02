import { type NextFunction, type Request, type Response, Router } from 'express';

export const base_route = Router({ caseSensitive: true, strict: true });

base_route.get('/', [], (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ success: true, api: 'rest', message: 'rest base', data: {} });
});
