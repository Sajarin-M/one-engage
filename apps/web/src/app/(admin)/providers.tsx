'use client';

import { AuthProvider } from '@/components/auth-provider';


function Providers({ children }: any) {
  return (
        <AuthProvider>
          {children}
        </AuthProvider>
  );
}

export default Providers;
