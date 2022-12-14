import { ReactNode, createContext, useContext } from 'react';
import { YoutubeApi } from '../../api/youtube';
import { Youtube } from '../../api/youtube';

type YoutubeContextProviderProps = {
  children: ReactNode;
};

const youtube = Youtube;

export const YoutubeContext = createContext<YoutubeApi>({} as YoutubeApi);

export function YoutubeContextProvider({
  children,
}: YoutubeContextProviderProps) {
  return (
    <YoutubeContext.Provider value={youtube}>
      {children}
    </YoutubeContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeContext);
}
