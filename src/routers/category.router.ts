import { Router } from 'express';
import type { ReturnTypeCategoryService } from '../types/services.js';
import { createCategoryHandler } from '../handlers/category.handler.js';

export const createCategoryRouter = (service: ReturnTypeCategoryService) => {
  const router = Router();
  const handler = createCategoryHandler(service);
  router.get('/', handler.getAll);
  router.get('/:id', handler.getById);
  router.post('/', handler.create);
  return router;
};