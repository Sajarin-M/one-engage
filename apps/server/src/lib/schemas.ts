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

export const editSliderSchema = createSliderSchema;

export const editPageContentSchema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
  buttonLabel: z.string().min(1, 'Required'),
  image: imageSchema,
});

export const editWhoWeAreSchema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  buttonLabel: z.string().min(1, 'Required'),
  image: imageSchema,
});

export const editWhatWeOfferSchema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  image: imageSchema,
});

export const editUnlockYourWorldSchema = z.object({
  title: z.string().min(1, 'Required'),
  buttonLabel: z.string().min(1, 'Required'),
  buttonLink: z.string().min(1, 'Required'),
  image: imageSchema,
});

export const editNoMattersSchema = z.object({
  title: z.string().min(1, 'Required'),
  subtitle: z.string().min(1, 'Required'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Please enter your password').max(100, 'Password is too long'),
});
