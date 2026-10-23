import type { Request, Response, NextFunction } from 'express';
import type { ReturnTypeCategoryService } from '../types/services.js';
import { ApiError } from '../shared/errors.js';

export const createCategoryHandler = (service: ReturnTypeCategoryService) => ({
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try { res.status(200).json(await service.getAll()); } catch (error) { next(error); }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id < 1) throw new ApiError(400, 'Invalid category id');
      res.status(200).json(await service.getById(id));
    } catch (error) { next(error); }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body ?? {};
      if (typeof name !== 'string' || !name.trim()) throw new ApiError(422, 'Category name is required');
      res.status(201).json(await service.create(name.trim()));
    } catch (error) { next(error); }
  },
});