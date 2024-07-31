import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/db.js';
import { env } from '../lib/env.js';
import { AppError, handler } from '../lib/helpers.js';
import { loginSchema } from '../lib/schemas.js';

const authRouter = Router();

authRouter.post(
  '/login',
  handler({
    body: loginSchema,
    handler: async (req) => {
      const user = await prisma.admin.findFirst({
        where: { email: req.body.email },
        select: {
          id: true,
          email: true,
          password: true,
          fullName: true,
        },
      });

      if (!user) {
        throw new AppError('Invalid email or password', 401);
      }

      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      if (!passwordMatch) {
        throw new AppError('Invalid email or password', 401);
      }

      const token = jwt.sign(
        {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
        env.JWT_PRIVATE_KEY,
      );

      return { token };
    },
  }),
);

export default authRouter;
