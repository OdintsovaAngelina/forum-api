export type ReturnTypePostService = {
  getAll: (category?: string, take?: number) => Promise<unknown[]>;
  getById: (id: number) => Promise<unknown>;
  create: (data: { title: string; content: string; categoryId: number; authorId: number }) => Promise<unknown>;
};
export type ReturnTypeCategoryService = {
  getAll: () => Promise<unknown[]>;
  getById: (id: number) => Promise<unknown>;
  create: (name: string) => Promise<unknown>;
};
export type ReturnTypeAuthService = {
  register: (email: string, password: string) => Promise<{ id: number; email: string }>;
  login: (email: string, password: string) => Promise<{ id: number; email: string; accessToken: string }>;
};