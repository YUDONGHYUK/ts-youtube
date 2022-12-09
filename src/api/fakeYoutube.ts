import axios from 'axios';

export type Video = {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
        width: string;
        height: string;
      };
    };
    channelTitle: string;
  };
};

export const FakeYoutube = (function () {
  return {
    search: async function (
      keyword: string | undefined,
      categoryId: string | null | undefined
    ) {
      if (keyword) return this.searchByKeyword();
      return categoryId ? this.searchByCategoryId() : this.mostPopular();
    },
    searchByKeyword: async function (): Promise<Video[]> {
      const { data } = await axios.get(`/videos/search.json`);
      const items = data.items.map((item: any) => ({
        ...item,
        id: item.id.videoId,
      }));

      return items;
    },
    searchByCategoryId: async function (): // categoryId: string | null
    Promise<Video[]> {
      const { data } = await axios.get(`/videos/category.json`);
      const items = data.items.map((item: any) => ({
        ...item,
        id: item.id.videoId,
      }));

      return items;
    },
    mostPopular: async function (): Promise<Video[]> {
      const { data } = await axios.get('/videos/popular.json');

      return data.items;
    },
    channelDetail: async function () {
      const { data } = await axios.get('/videos/channel.json');

      return data.items[0];
    },
    relatedVideos: async function (): Promise<Video[]> {
      const { data } = await axios.get(`/videos/related.json`);
      const items = data.items.map((item: any) => ({
        ...item,
        id: item.id.videoId,
      }));

      return items;
    },
  };
})();
