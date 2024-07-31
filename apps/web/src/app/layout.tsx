import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { env } from '@/lib/env';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head></head>
      <body className={cn(poppins.className, poppins.variable)}>{children}</body>
    </html>
  );
}
