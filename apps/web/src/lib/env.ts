import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  client: {
    NEXT_PUBLIC_API_PROTOCOL: z.string().min(1),
    NEXT_PUBLIC_API_HOST: z.string().min(1),
    NEXT_PUBLIC_API_PORT: z.coerce.number(),
    NEXT_PUBLIC_API_IMAGES_PREFIX: z.string().min(1),
    NEXT_PUBLIC_SITE_URL: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_PROTOCOL: process.env.NEXT_PUBLIC_API_PROTOCOL,
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEXT_PUBLIC_API_PORT: process.env.NEXT_PUBLIC_API_PORT,
    NEXT_PUBLIC_API_IMAGES_PREFIX: process.env.NEXT_PUBLIC_API_IMAGES_PREFIX,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
