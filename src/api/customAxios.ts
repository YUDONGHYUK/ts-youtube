import axios, { AxiosInstance } from 'axios';

type Params = {
  part: string;
  chart?: 'mostPopular';
  id?: string;
  maxResults?: number;
  regionCode?: 'KR';
  videoCategoryId?: string | null | undefined;
  relatedToVideoId?: string;
  q?: string | undefined;
  type?: 'video';
};

export const customAxios: AxiosInstance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
});

export const initApi = {
  search: (params: Params) => customAxios.get('search', { params }),
  videos: (params: Params) => customAxios.get('videos', { params }),
  channels: (params: Params) => customAxios.get('channels', { params }),
};
