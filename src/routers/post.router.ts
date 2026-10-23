import { Router } from 'express';
import type { ReturnTypePostService } from '../types/services.js';
import { createPostHandler } from '../handlers/post.handler.js';

export const createPostRouter = (service: ReturnTypePostService) => {
  const router = Router();
  const handler = createPostHandler(service);
  router.get('/', handler.getAll);
  router.get('/:id', handler.getById);
  router.post('/', handler.create);
  return router;
};