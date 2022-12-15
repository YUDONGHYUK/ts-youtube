import { ReactNode } from 'react';
import { YoutubeContext } from './YoutubeContext';
import { Youtube } from '../../api/youtube';

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
