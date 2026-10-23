export const createUserRepository = (db: any) => ({
  getByEmail: async (email: string) => db.orm.public.User.where({ email }).first(),
  getById: async (id: number) => db.orm.public.User.where({ id }).first(),
  create: async (email: string, password: string) => db.orm.public.User.create({ email, password }),
});