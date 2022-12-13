import { ReactNode } from 'react';
import { createMemoryRouter, createRoutesFromElements } from 'react-router-dom';

export function createWithMemoryRouter(
  routes: ReactNode,
  initialEntries: string[] = ['/']
) {
  return createMemoryRouter(createRoutesFromElements(routes), {
    initialEntries,
  });
}
