import { Router } from 'express';
import { z } from 'zod';
import { Prisma, prisma } from '../lib/db.js';
import { handler, isAdmin } from '../lib/helpers.js';
import { createSliderSchema, editSliderSchema } from '../lib/schemas.js';

const slidersRouter = Router();

const sliderSelect = {
  id: true,
  title: true,
  image: true,
} satisfies Prisma.SliderSelect;

slidersRouter.get(
  '/',
  handler({
    use: [isAdmin],
    handler: async () => {
      const sliders = await prisma.slider.findMany({
        select: sliderSelect,
      });
      return sliders;
    },
  }),
);

slidersRouter.post(
  '/',
  handler({
    use: [isAdmin],
    body: createSliderSchema,
    handler: async (req) => {
      const createdSlider = await prisma.slider.create({
        data: { title: req.body.title, image: req.body.image },
        select: sliderSelect,
      });

      return createdSlider;
    },
  }),
);

slidersRouter.put(
  '/:id',
  handler({
    use: [isAdmin],
    params: z.object({ id: z.string() }),
    body: editSliderSchema,
    handler: async (req) => {
      const updatedSlider = await prisma.slider.update({
        where: { id: req.params.id },
        data: { title: req.body.title, image: req.body.image },
        select: sliderSelect,
      });
      return updatedSlider;
    },
  }),
);

slidersRouter.delete(
  '/:id',
  handler({
    use: [isAdmin],
    params: z.object({ id: z.string() }),
    handler: async (req) => {
      const deletedSlider = await prisma.slider.delete({
        where: { id: req.params.id },
        select: sliderSelect,
      });
      return deletedSlider;
    },
  }),
);

export default slidersRouter;
