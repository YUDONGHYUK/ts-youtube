import { createContext, useContext } from 'react';
import { Youtube } from '../api/youtube';

export const YoutubeContext = createContext({} as Youtube);

export function useYoutubeApi() {
  return useContext(YoutubeContext);
}
