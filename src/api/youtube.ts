import { customAxios } from './customAxios';
import { Channel, Video } from '../types';

export type YoutubeApi = {
  search: (
    keyword: string | undefined,
    categoryId: string | null
  ) => Promise<Video[]>;
  searchByKeyword: (keyword: string | undefined) => Promise<Video[]>;
  searchByCategoryId: (categoryId: string | null) => Promise<Video[]>;
  mostPopular: () => Promise<Video[]>;
  channelDetail: (id: string) => Promise<Channel>;
  relatedVideos: (keyword: string) => Promise<Video[]>;
};

export const Youtube: YoutubeApi = (function () {
  return {
    search: async function (keyword, categoryId) {
      if (keyword) return this.searchByKeyword(keyword);
      return categoryId
        ? this.searchByCategoryId(categoryId)
        : this.mostPopular();
    },
    searchByKeyword: async function (keyword) {
      const { data } = await customAxios.get('search', {
        params: {
          part: 'snippet',
          maxResults: 25,
          q: keyword,
          type: 'video',
        },
      });
      const items = data.items.map((item: any) => ({
        ...item,
        id: item.id.videoId,
      }));

      return items;
    },
    searchByCategoryId: async function (categoryId) {
      const { data } = await customAxios.get('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          videoCategoryId: categoryId,
          regionCode: 'KR',
          maxResults: 25,
          type: 'video',
        },
      });

      return data.items;
    },
    mostPopular: async function () {
      const { data } = await customAxios('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          regionCode: 'KR',
          maxResults: 25,
        },
      });

      return data.items;
    },
    channelDetail: async function (id) {
      const { data } = await customAxios('channels', {
        params: {
          part: 'snippet,statistics',
          id: id,
        },
      });

      return data.items[0];
    },
    relatedVideos: async function (keyword) {
      const { data } = await customAxios('search', {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          relatedToVideoId: keyword,
        },
      });
      const items = data.items.map((item: any) => ({
        ...item,
        id: item.id.videoId,
      }));

      return items;
    },
  };
})();
