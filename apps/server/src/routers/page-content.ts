import { Router } from 'express';
import { z } from 'zod';
import { Prisma, prisma } from '../lib/db.js';
import { handler, isAdmin } from '../lib/helpers.js';
import { editPageContentSchema } from '../lib/schemas.js';

const pageContentRouter = Router();

const pageContentSelect = {
  id: true,
  title: true,
  subtitle: true,
  buttonLabel: true,
  visible: true,
  image: true,
} satisfies Prisma.PageContentSelect;

pageContentRouter.get(
  '/',
  handler({
    use: [isAdmin],
    handler: async () => {
      const pageContent = await prisma.pageContent.findFirst({
        select: pageContentSelect,
      });
      return pageContent || undefined;
    },
  }),
);

pageContentRouter.put(
  '/',
  handler({
    // use: [isAdmin],
    body: editPageContentSchema,
    handler: async (req) => {
      const existing = await prisma.pageContent.findFirst({
        select: { id: true },
      });

      if (!existing) {
        const createdPageContent = await prisma.pageContent.create({
          data: req.body,
          select: pageContentSelect,
        });

        return createdPageContent;
      }

      const editedPageContent = await prisma.pageContent.update({
        where: { id: existing.id },
        data: req.body,
        select: pageContentSelect,
      });

      return editedPageContent;
    },
  }),
);

pageContentRouter.patch(
  '/change-visibility',
  handler({
    // use: [isAdmin],
    body: z.object({
      visible: z.boolean(),
    }),
    handler: async (req) => {
      const existing = await prisma.pageContent.findFirst({
        select: { id: true },
      });

      if (!existing) {
        return null;
      }

      const editedPageContent = await prisma.pageContent.update({
        where: { id: existing.id },
        data: { visible: req.body.visible },
        select: pageContentSelect,
      });

      return editedPageContent;
    },
  }),
);

export default pageContentRouter;
