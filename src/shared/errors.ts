export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const errorHandler = (
  error: unknown,
  _req: import('express').Request,
  res: import('express').Response,
  _next: import('express').NextFunction,
) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
};