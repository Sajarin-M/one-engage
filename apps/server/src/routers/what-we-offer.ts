import { Router } from 'express';
import { z } from 'zod';
import { Prisma, prisma } from '../lib/db.js';
import { handler } from '../lib/helpers.js';
import { editWhatWeOfferSchema } from '../lib/schemas.js';

const whatWeOfferRouter = Router();

const whatWeOfferSelect = {
  id: true,
  title: true,
  subtitle: true,
  description: true,
  visible: true,
  image: true,
} satisfies Prisma.WhatWeOfferSelect;

whatWeOfferRouter.get(
  '/',
  handler({
    // use: [isAdmin],
    handler: async () => {
      const whatWeOffer = await prisma.whatWeOffer.findFirst({
        select: whatWeOfferSelect,
      });
      return whatWeOffer || undefined;
    },
  }),
);

whatWeOfferRouter.put(
  '/',
  handler({
    // use: [isAdmin],
    body: editWhatWeOfferSchema,
    handler: async (req) => {
      const existing = await prisma.whatWeOffer.findFirst({
        select: { id: true },
      });

      if (!existing) {
        const createdWhatWeOffer = await prisma.whatWeOffer.create({
          data: req.body,
          select: whatWeOfferSelect,
        });

        return createdWhatWeOffer;
      }

      const editedWhatWeOffer = await prisma.whatWeOffer.update({
        where: { id: existing.id },
        data: req.body,
        select: whatWeOfferSelect,
      });

      return editedWhatWeOffer;
    },
  }),
);

whatWeOfferRouter.patch(
  '/change-visibility',
  handler({
    // use: [isAdmin],
    body: z.object({
      visible: z.boolean(),
    }),
    handler: async (req) => {
      const existing = await prisma.whatWeOffer.findFirst({
        select: { id: true },
      });

      if (!existing) {
        return null;
      }

      const editedWhatWeOffer = await prisma.whatWeOffer.update({
        where: { id: existing.id },
        data: { visible: req.body.visible },
        select: whatWeOfferSelect,
      });

      return editedWhatWeOffer;
    },
  }),
);

export default whatWeOfferRouter;
