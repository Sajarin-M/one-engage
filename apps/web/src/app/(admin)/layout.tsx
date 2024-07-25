import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'One Engage: Admin Portal',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
