import type { Request, Response, NextFunction } from 'express';
import type { ReturnTypeAuthService } from '../types/services.js';
import { ApiError } from '../shared/errors.js';

export const createAuthHandler = (service: ReturnTypeAuthService) => ({
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body ?? {};
      if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          typeof password !== 'string' || password.length < 8) {
        throw new ApiError(422, 'Valid email and password of at least 8 characters are required');
      }
      res.status(201).json(await service.register(email.toLowerCase().trim(), password));
    } catch (error) { next(error); }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body ?? {};
      if (typeof email !== 'string' || typeof password !== 'string') {
        throw new ApiError(422, 'Email and password are required');
      }
      const result = await service.login(email.toLowerCase().trim(), password);
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true, secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', maxAge: 2 * 60 * 60 * 1000, path: '/',
      });
      res.status(200).json({ id: result.id, email: result.email });
    } catch (error) { next(error); }
  },
  logout: (_req: Request, res: Response) => {
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'lax', path: '/' });
    res.status(200).json({ message: 'Logged out' });
  },
});