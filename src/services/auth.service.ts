import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../shared/errors.js';

const secret = () => {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error('JWT_SECRET is not configured');
  return value;
};

export const createAuthService = (repository: ReturnType<typeof import('../repositories/user.repository.js').createUserRepository>) => ({
  register: async (email: string, password: string) => {
    if (await repository.getByEmail(email)) throw new ApiError(409, 'Email already registered');
    const hash = await bcrypt.hash(password, 12);
    const user = await repository.create(email, hash);
    return { id: user.id, email: user.email };
  },
  login: async (email: string, password: string) => {
    const user = await repository.getByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) throw new ApiError(401, 'Invalid email or password');
    const accessToken = jwt.sign({ sub: String(user.id), email: user.email }, secret(), { expiresIn: '2h' });
    return { id: user.id, email: user.email, accessToken };
  },
});