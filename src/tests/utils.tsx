import { ReactNode } from 'react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

export function createWithMemoryRouter(
  routes: ReactNode,
  initialEntries: string[] = ['/']
) {
  const router = createMemoryRouter(createRoutesFromElements(routes), {
    initialEntries,
  });

  return <RouterProvider router={router} />;
}
