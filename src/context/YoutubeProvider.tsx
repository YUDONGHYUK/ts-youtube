import { ReactNode } from 'react';
import { YoutubeContext } from './YoutubeContext';
import YoutubeAPI from '../api/youtube';
// import FakeYoutubeAPI from '../api/fakeYoutube';

type YoutubeContextProviderProps = {
  children: ReactNode;
};

const youtube = new YoutubeAPI();

export function YoutubeContextProvider({
  children,
}: YoutubeContextProviderProps) {
  return (
    <YoutubeContext.Provider value={youtube}>
      {children}
    </YoutubeContext.Provider>
  );
}
