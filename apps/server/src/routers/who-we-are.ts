import { Router } from 'express';
import { z } from 'zod';
import { Prisma, prisma } from '../lib/db.js';
import { handler, isAdmin } from '../lib/helpers.js';
import { editWhoWeAreSchema } from '../lib/schemas.js';

const whoWeAreRouter = Router();

const whoWeAreSelect = {
  id: true,
  title: true,
  subtitle: true,
  description: true,
  buttonLabel: true,
  visible: true,
  image: true,
} satisfies Prisma.WhoWeAreSelect;

whoWeAreRouter.get(
  '/',
  handler({
    use: [isAdmin],
    handler: async () => {
      const whoWeAre = await prisma.whoWeAre.findFirst({
        select: whoWeAreSelect,
      });
      return whoWeAre || undefined;
    },
  }),
);

whoWeAreRouter.put(
  '/',
  handler({
    use: [isAdmin],
    body: editWhoWeAreSchema,
    handler: async (req) => {
      const existing = await prisma.whoWeAre.findFirst({
        select: { id: true },
      });

      if (!existing) {
        const createdWhoWeAre = await prisma.whoWeAre.create({
          data: req.body,
          select: whoWeAreSelect,
        });

        return createdWhoWeAre;
      }

      const editedWhoWeAre = await prisma.whoWeAre.update({
        where: { id: existing.id },
        data: req.body,
        select: whoWeAreSelect,
      });

      return editedWhoWeAre;
    },
  }),
);

whoWeAreRouter.patch(
  '/change-visibility',
  handler({
    use: [isAdmin],
    body: z.object({
      visible: z.boolean(),
    }),
    handler: async (req) => {
      const existing = await prisma.whoWeAre.findFirst({
        select: { id: true },
      });

      if (!existing) {
        return null;
      }

      const editedWhoWeAre = await prisma.whoWeAre.update({
        where: { id: existing.id },
        data: { visible: req.body.visible },
        select: whoWeAreSelect,
      });

      return editedWhoWeAre;
    },
  }),
);

export default whoWeAreRouter;
