import { createContext, useContext } from 'react';
import { YoutubeApi } from '../../api/youtube';

export const YoutubeContext = createContext({} as YoutubeApi);

export function useYoutubeApi() {
  return useContext(YoutubeContext);
}
