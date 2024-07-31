import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z, ZodError, ZodSchema } from 'zod';
import { env } from '../lib/env.js';
import { makeHandler } from './express-ts-handler.js';

// to differentiate application errors from unexpected errors
export class AppError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export const handler = makeHandler<ZodSchema>({
  parse: (type, value) => type.parse(value),
  object: z.object,
});

export const isAdmin = (req: Request) => {
  if (
    !('headers' in req) ||
    !req.headers.authorization ||
    typeof req.headers.authorization !== 'string' ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    throw new AppError('Access denied', 401);
  }

  const token = req.headers.authorization.split('Bearer ')[1];
  console.log(token);

  try {
    const user = jwt.verify(token, env.JWT_PRIVATE_KEY);
    return Object.assign(req, { user });
  } catch (error) {
    throw new AppError('Access denied', 401);
  }
};

export const isAdminExpress = (req: Request, _res: Response, next: NextFunction) => {
  try {
    isAdmin(req);
    next();
  } catch (error) {
    next(error);
  }
};

export function errorHandler(err: unknown, _req: Request, res: Response, _: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).send(err.message);
  }

  if (err instanceof ZodError) {
    return res.status(422).send(err);
  }

  console.log(err);
  res.status(500).send('Something went wrong');
}
