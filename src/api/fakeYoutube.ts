import axios from 'axios';

export type Video = {
  id: string;
  snippet: {
    title: string;
  };
};

export const FakeYoutube = (function () {
  return {
    search: async function (keyword: string | undefined) {
      return keyword ? this.searchByKeyword() : this.mostPopular();
    },
    searchByKeyword: async function (): Promise<Video[]> {
      const { data } = await axios.get(`/videos/search.json`);
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
  };
})();
