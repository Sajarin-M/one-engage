import { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { env } from '@/lib/env';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
