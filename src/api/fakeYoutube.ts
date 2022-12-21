import axios from 'axios';
import { Channel, Video } from '../types';

export default class FakeYoutubeAPI {
  async search(keyword: string | undefined, categoryId: string | null) {
    if (keyword) return this.searchByKeyword(keyword);
    return categoryId
      ? this.searchByCategoryId(categoryId)
      : this.mostPopular();
  }

  private async searchByKeyword(keyword: string | undefined): Promise<Video[]> {
    const { data } = await axios.get(`/videos/search.json`);
    const items = data.items.map((item: any) => ({
      ...item,
      id: item.id.videoId,
    }));

    return items;
  }

  private async searchByCategoryId(
    categoryId: string | null
  ): Promise<Video[]> {
    const { data } = await axios.get(`/videos/category.json`);
    const items = data.items.map((item: any) => ({
      ...item,
      id: item.id.videoId,
    }));

    return items;
  }

  private async mostPopular(): Promise<Video[]> {
    const { data } = await axios.get('/videos/popular.json');

    return data.items;
  }

  async channelDetail(id: string): Promise<Channel> {
    const { data } = await axios.get('/videos/channel.json');

    return data.items[0];
  }

  async relatedVideos(keyword: string): Promise<Video[]> {
    const { data } = await axios.get(`/videos/related.json`);
    const items = data.items.map((item: any) => ({
      ...item,
      id: item.id.videoId,
    }));

    return items;
  }
}
