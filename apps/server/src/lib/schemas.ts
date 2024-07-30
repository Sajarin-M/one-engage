import { z } from 'zod';

export const imageSchema = z.object({
  name: z.string().min(1, 'Required'),
  altText: z.string().optional().default(''),
  width: z.number(),
  height: z.number(),
  blurUrl: z.string(),
  size: z.number(),
});

export const createSliderSchema = z.object({
  title: z.string().min(1, 'Required'),
  image: imageSchema,
});

export const editPageContentSchema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
  buttonLabel: z.string().min(1, 'Required'),
  image: imageSchema,
});

export const editSliderSchema = createSliderSchema;
