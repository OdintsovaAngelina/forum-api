import { Router } from 'express';
import type { ReturnTypeAuthService } from '../types/services.js';
import { createAuthHandler } from '../handlers/auth.handler.js';

export const createAuthRouter = (service: ReturnTypeAuthService) => {
  const router = Router();
  const handler = createAuthHandler(service);
  router.post('/register', handler.register);
  router.post('/login', handler.login);
  router.post('/logout', handler.logout);
  return router;
};