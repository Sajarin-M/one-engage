import { Router } from 'express';
import { z } from 'zod';
import { Prisma, prisma } from '../lib/db.js';
import { handler } from '../lib/helpers.js';
import { editUnlockYourWorldSchema } from '../lib/schemas.js';

const unlockYourWorldRouter = Router();

const unlockYourWorldSelect = {
  id: true,
  title: true,
  buttonLabel: true,
  buttonLink: true,
  visible: true,
  image: true,
} satisfies Prisma.UnlockYourWorldSelect;

unlockYourWorldRouter.get(
  '/',
  handler({
    // use: [isAdmin],
    handler: async () => {
      const unlockYourWorld = await prisma.unlockYourWorld.findFirst({
        select: unlockYourWorldSelect,
      });
      return unlockYourWorld || undefined;
    },
  }),
);

unlockYourWorldRouter.put(
  '/',
  handler({
    // use: [isAdmin],
    body: editUnlockYourWorldSchema,
    handler: async (req) => {
      const existing = await prisma.unlockYourWorld.findFirst({
        select: { id: true },
      });

      if (!existing) {
        const createdUnlockYourWorld = await prisma.unlockYourWorld.create({
          data: req.body,
          select: unlockYourWorldSelect,
        });

        return createdUnlockYourWorld;
      }

      const editedUnlockYourWorld = await prisma.unlockYourWorld.update({
        where: { id: existing.id },
        data: req.body,
        select: unlockYourWorldSelect,
      });

      return editedUnlockYourWorld;
    },
  }),
);

unlockYourWorldRouter.patch(
  '/change-visibility',
  handler({
    // use: [isAdmin],
    body: z.object({
      visible: z.boolean(),
    }),
    handler: async (req) => {
      const existing = await prisma.unlockYourWorld.findFirst({
        select: { id: true },
      });

      if (!existing) {
        return null;
      }

      const editedUnlockYourWorld = await prisma.unlockYourWorld.update({
        where: { id: existing.id },
        data: { visible: req.body.visible },
        select: unlockYourWorldSelect,
      });

      return editedUnlockYourWorld;
    },
  }),
);

export default unlockYourWorldRouter;
