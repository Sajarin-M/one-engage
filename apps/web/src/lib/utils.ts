import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from './env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(name: string) {
  return `${env.NEXT_PUBLIC_API_PROTOCOL}://${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}/${env.NEXT_PUBLIC_API_IMAGES_PREFIX}/${name}`;
}
