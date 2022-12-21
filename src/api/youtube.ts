import { customAxios } from './customAxios';
import { Channel, Video } from '../types';

export interface Youtube {
  search: (
    keyword: string | undefined,
    categoryId: string | null
  ) => Promise<Video[]>;
  channelDetail: (id: string) => Promise<Channel>;
  relatedVideos: (keyword: string) => Promise<Video[]>;
}

export default class YoutubeAPI implements Youtube {
  async search(keyword: string | undefined, categoryId: string | null) {
    if (keyword) return this.searchByKeyword(keyword);
    return categoryId
      ? this.searchByCategoryId(categoryId)
      : this.mostPopular();
  }

  private async searchByKeyword(keyword: string | undefined): Promise<Video[]> {
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
  }

  private async searchByCategoryId(
    categoryId: string | null
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
  }

  private async mostPopular(): Promise<Video[]> {
    const { data } = await customAxios('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        regionCode: 'KR',
        maxResults: 25,
      },
    });

    return data.items;
  }

  async channelDetail(id: string): Promise<Channel> {
    const { data } = await customAxios('channels', {
      params: {
        part: 'snippet,statistics',
        id: id,
      },
    });

    return data.items[0];
  }

  async relatedVideos(keyword: string): Promise<Video[]> {
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
  }
}
