import { ReactNode } from 'react';
import { Youtube } from '../api/youtube';
import { YoutubeContext } from './YoutubeContext';

type YoutubeContextProviderProps = {
  children: ReactNode;
};

const youtube = Youtube;

export function YoutubeContextProvider({
  children,
}: YoutubeContextProviderProps) {
  return (
    <YoutubeContext.Provider value={youtube}>
      {children}
    </YoutubeContext.Provider>
  );
}
