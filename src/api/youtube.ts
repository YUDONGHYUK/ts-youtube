import { customAxios } from './customAxios';
import { Video } from './fakeYoutube';

export const Youtube = (function () {
  return {
    search: async function (keyword: string | undefined) {
      return keyword ? this.searchByKeyword(keyword) : this.mostPopular();
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
    mostPopular: async function (): Promise<Video[]> {
      const { data } = await customAxios('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 25,
        },
      });

      return data.items;
    },
    channelDetail: async function (keyword: string) {
      const { data } = await customAxios('channels', {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 25,
          q: keyword,
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
      console.log(data);
      const items = data.items.map((item: any) => ({
        ...item,
        id: item.id.videoId,
      }));

      return items;
    },
  };
})();
