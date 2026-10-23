import type { CreatePostInput } from '../domain/post/post.types.js';
import { ApiError } from '../shared/errors.js';

export const createPostService = (repository: ReturnType<typeof import('../repositories/post.repository.js').createPostRepository>) => ({
  getAll: (category?: string, take?: number) => repository.getAll(category, take),
  getById: async (id: number) => {
    const post = await repository.getById(id);
    if (!post) throw new ApiError(404, 'Post not found');
    return post;
  },
  create: async (data: CreatePostInput) => {
    try {
      return await repository.create(data);
    } catch (error) {
      // Foreign-key failures are validated as 400 before this call where possible.
      throw error;
    }
  },
});