import { ApiError } from '../shared/errors.js';
import type { CreatePostInput } from '../domain/post/post.types.js';

export const createPostRepository = (db: any) => ({
  getAll: async (categoryName?: string, take?: number) => {
    if (categoryName) {
      const category = await db.orm.public.Category.where({ name: categoryName }).first();
      if (!category) return [];
      let query = db.orm.public.Post.where({ categoryId: category.id })
        .include('category').include('author');
      if (take) query = query.limit(take);
      return query.all();
    }
    let query = db.orm.public.Post.include('category').include('author');
    if (take) query = query.limit(take);
    return query.all();
  },
  getById: async (id: number) => db.orm.public.Post.where({ id })
    .include('category').include('author').first(),
  create: async (data: CreatePostInput) => {
    const category = await db.orm.public.Category.where({ id: data.categoryId }).first();
    if (!category) throw new ApiError(400, 'Invalid categoryId');
    const author = await db.orm.public.User.where({ id: data.authorId }).first();
    if (!author) throw new ApiError(400, 'Invalid authorId');
    return db.orm.public.Post.create({
    title: data.title,
    content: data.content,
    category: (category: any) => category.connect({ id: data.categoryId }),
    author: (relatedAuthor: any) => relatedAuthor.connect({ id: data.authorId }),
    });
  },
});