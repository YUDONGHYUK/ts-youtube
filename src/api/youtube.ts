import { customAxios } from './customAxios';
import { Video } from '../types';

export const Youtube = (function () {
  return {
    search: async function (
      keyword: string | undefined,
      categoryId: string | null | undefined
    ) {
      if (keyword) return this.searchByKeyword(keyword);
      return categoryId
        ? this.searchByCategoryId(categoryId)
        : this.mostPopular();
    },
    searchByKeyword: async function (
      keyword: string | undefined
    ): Promise<Video[]> {
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
    searchByCategoryId: async function (
      categoryId: string | null | undefined
    ): Promise<Video[]> {
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
    mostPopular: async function (): Promise<Video[]> {
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
    channelDetail: async function (id: string) {
      const { data } = await customAxios('channels', {
        params: {
          part: 'snippet,statistics',
          id: id,
        },
      });

      return data.items[0];
    },
    relatedVideos: async function (keyword: string) {
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
