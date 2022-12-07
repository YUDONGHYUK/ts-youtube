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
  };
})();

// export async function searchVideo(keyword: string | undefined) {
//   return keyword ? searchByKeyword(keyword) : mostPopular();
// }

// async function searchByKeyword(keyword: string | undefined) {
//   const { data } = await customAxios.get('search', {
//     params: {
//       part: 'snippet',
//       maxResults: 25,
//       type: 'video',
//       q: keyword,
//     },
//   });

//   console.log(data);

//   // const items = data.items.map((item: any) =>
//   //   item.id ? item : { ...item, id: item.id.videoId }
//   // );

//   // return items;
//   return data;
// }

// async function mostPopular(): Promise<Video[]> {
//   const { data } = await axios.get(`videos/popular.json`);

//   return data.items;
// }
