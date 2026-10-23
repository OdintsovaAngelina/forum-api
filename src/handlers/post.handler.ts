import type { Request, Response, NextFunction } from 'express';
import type { ReturnTypePostService } from '../types/services.js';
import { ApiError } from '../shared/errors.js';

export const createPostHandler = (service: ReturnTypePostService) => ({
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = typeof req.query.category === 'string' ? req.query.category : undefined;
      const rawTake = req.query.take;
      let take: number | undefined;
      if (rawTake !== undefined) {
        take = Number(rawTake);
        if (!Number.isInteger(take) || take < 1) throw new ApiError(400, 'Invalid take value');
      }
      res.status(200).json(await service.getAll(category, take));
    } catch (error) { next(error); }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id < 1) throw new ApiError(400, 'Invalid post id');
      res.status(200).json(await service.getById(id));
    } catch (error) { next(error); }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, categoryId, authorId } = req.body ?? {};
      if (typeof title !== 'string' || !title.trim() ||
          typeof content !== 'string' || !content.trim() ||
          !Number.isInteger(Number(categoryId)) || Number(categoryId) < 1 ||
          !Number.isInteger(Number(authorId)) || Number(authorId) < 1) {
        throw new ApiError(422, 'Expected title, content, categoryId and authorId');
      }
      const result = await service.create({
        title: title.trim(), content: content.trim(),
        categoryId: Number(categoryId), authorId: Number(authorId),
      });
      res.status(201).json(result);
    } catch (error) { next(error); }
  },
});