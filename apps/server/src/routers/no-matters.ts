import { Router } from 'express';
import { z } from 'zod';
import { Prisma, prisma } from '../lib/db.js';
import { handler } from '../lib/helpers.js';
import { editNoMattersSchema } from '../lib/schemas.js';

const noMattersRouter = Router();

const noMattersSelect = {
  id: true,
  title: true,
  subtitle: true,
  visible: true,
} satisfies Prisma.NoMattersSelect;

noMattersRouter.get(
  '/',
  handler({
    // use: [isAdmin],
    handler: async () => {
      const noMatters = await prisma.noMatters.findFirst({
        select: noMattersSelect,
      });
      return noMatters || undefined;
    },
  }),
);

noMattersRouter.put(
  '/',
  handler({
    // use: [isAdmin],
    body: editNoMattersSchema,
    handler: async (req) => {
      const existing = await prisma.noMatters.findFirst({
        select: { id: true },
      });

      if (!existing) {
        const createdNoMatters = await prisma.noMatters.create({
          data: req.body,
          select: noMattersSelect,
        });

        return createdNoMatters;
      }

      const editedNoMatters = await prisma.noMatters.update({
        where: { id: existing.id },
        data: req.body,
        select: noMattersSelect,
      });

      return editedNoMatters;
    },
  }),
);

noMattersRouter.patch(
  '/change-visibility',
  handler({
    // use: [isAdmin],
    body: z.object({
      visible: z.boolean(),
    }),
    handler: async (req) => {
      const existing = await prisma.noMatters.findFirst({
        select: { id: true },
      });

      if (!existing) {
        return null;
      }

      const editedNoMatters = await prisma.noMatters.update({
        where: { id: existing.id },
        data: { visible: req.body.visible },
        select: noMattersSelect,
      });

      return editedNoMatters;
    },
  }),
);

export default noMattersRouter;
