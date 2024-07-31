import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { handler } from '../lib/helpers.js';

const contentsRouter = Router();

contentsRouter.get(
  '/',
  handler({
    handler: async () => {
      const [sliders, pageContent, whoWeAre, whatWeOffer] = await prisma.$transaction([
        prisma.slider.findMany({
          select: {
            id: true,
            title: true,
            image: true,
          },
        }),
        prisma.pageContent.findFirst({
          where: { visible: true },
          select: {
            title: true,
            subtitle: true,
            buttonLabel: true,
            image: true,
          },
        }),
        prisma.whoWeAre.findFirst({
          where: { visible: true },
          select: {
            title: true,
            subtitle: true,
            buttonLabel: true,
            description: true,
            image: true,
          },
        }),
        prisma.whatWeOffer.findFirst({
          where: { visible: true },
          select: {
            title: true,
            subtitle: true,
            description: true,
            image: true,
          },
        }),
      ]);

      const result = {
        sliders,
        pageContent,
        whoWeAre,
        whatWeOffer,
      };

      return result;
    },
  }),
);

export default contentsRouter;
