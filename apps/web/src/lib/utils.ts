import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { ImageUploadVm, ImageVm } from '@/types';
import { env } from './env';
import http from './http';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageSchema = z
  .object({
    name: z.string().or(z.instanceof(File)),
    altText: z.string(),
  })
  .refine((value) => value.name instanceof File || value.name !== '', {
    message: 'Required',
    path: ['name'],
  });

export function getImageUrl(name: string) {
  return `${env.NEXT_PUBLIC_API_PROTOCOL}://${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}/${env.NEXT_PUBLIC_API_IMAGES_PREFIX}/${name}`;
}

export function getImagePreviewUrl(file: File | string) {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }

  if (file) {
    return getImageUrl(file);
  }
}

export async function uploadImage({
  current,
  previous,
}: {
  current: { name: File | string; altText: string };
  previous?: ImageVm;
}): Promise<ImageVm> {
  if (current.name instanceof File) {
    const formData = new FormData();
    formData.append('file', current.name);
    const { data } = await http.post<ImageUploadVm>('/api/admin/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { ...data, altText: current.altText };
  }

  if (!previous) throw new Error('previous is required if file is not an instance of File');

  return { ...previous, altText: current.altText };
}
