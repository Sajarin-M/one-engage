'use client';

import { AuthProvider } from '@/components/auth-provider';
import QueryProvider from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';

function Providers({ children }: any) {
  return (
    <>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
      <Toaster />
    </>
  );
}

export default Providers;
