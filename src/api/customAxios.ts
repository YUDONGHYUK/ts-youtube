import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
});
