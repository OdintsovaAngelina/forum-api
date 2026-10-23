import express from 'express';
import cookieParser from 'cookie-parser';
import { db } from './prisma/db.js';
import { createPostRepository } from './repositories/post.repository.js';
import { createPostService } from './services/post.service.js';
import { createPostRouter } from './routers/post.router.js';
import { createCategoryRepository } from './repositories/category.repository.js';
import { createCategoryService } from './services/category.service.js';
import { createCategoryRouter } from './routers/category.router.js';
import { createUserRepository } from './repositories/user.repository.js';
import { createAuthService } from './services/auth.service.js';
import { createAuthRouter } from './routers/auth.router.js';
import { errorHandler } from './shared/errors.js';

export const app = express();
app.use(express.json());
app.use(cookieParser());

const postRepository = createPostRepository(db);
const postService = createPostService(postRepository);
const categoryRepository = createCategoryRepository(db);
const categoryService = createCategoryService(categoryRepository);
const userRepository = createUserRepository(db);
const authService = createAuthService(userRepository);

app.get('/', (_req, res) => res.status(200).json({ message: 'Forum API is working' }));
app.use('/posts', createPostRouter(postService));
app.use('/categories', createCategoryRouter(categoryService));
app.use('/auth', createAuthRouter(authService));
app.use(errorHandler);