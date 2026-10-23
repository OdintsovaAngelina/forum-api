import { ApiError } from '../shared/errors.js';

export const createCategoryService = (repository: ReturnType<typeof import('../repositories/category.repository.js').createCategoryRepository>) => ({
  getAll: () => repository.getAll(),
  getById: async (id: number) => {
    const category = await repository.getById(id);
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  },
  create: async (name: string) => {
    if (await repository.getByName(name)) throw new ApiError(409, 'Category name already exists');
    try { return await repository.create(name); }
    catch (error) { throw error; }
  },
});