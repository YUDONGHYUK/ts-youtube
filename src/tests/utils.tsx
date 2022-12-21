import { ReactNode } from 'react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeContext } from '../context/YoutubeContext';
import { Youtube } from '../api/youtube';

export function createWithMemoryRouter(
  routes: ReactNode,
  initialEntries: string[] = ['/']
) {
  const router = createMemoryRouter(createRoutesFromElements(routes), {
    initialEntries,
  });

  return <RouterProvider router={router} />;
}

export function createWithContext(children: ReactNode, youtube: Youtube) {
  const testQueryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

  return (
    <YoutubeContext.Provider value={youtube}>
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    </YoutubeContext.Provider>
  );
}
