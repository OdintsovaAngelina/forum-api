export const createCategoryRepository = (db: any) => ({
  getAll: async () => db.orm.public.Category.all(),
  getById: async (id: number) => db.orm.public.Category.where({ id }).first(),
  getByName: async (name: string) => db.orm.public.Category.where({ name }).first(),
  create: async (name: string) => db.orm.public.Category.create({ name }),
});