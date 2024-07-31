'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';
import http from '@/lib/http';

export default function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: 'always',
            refetchOnWindowFocus: false,
          },
          mutations: {
            networkMode: 'always',
            onError: (error) => {
              if (http.isError(error)) {
                if (
                  error.response &&
                  error.response.data &&
                  typeof error.response.data === 'string'
                ) {
                  toast.error(error.response.data);
                }
              }
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition='bottom-left' />
    </QueryClientProvider>
  );
}
