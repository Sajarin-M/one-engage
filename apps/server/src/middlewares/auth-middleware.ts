import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../lib/env.js';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!('headers' in req) || !req.headers.authorization) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = req.headers.authorization;

  try {
    jwt.verify(token, env.JWT_PRIVATE_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
