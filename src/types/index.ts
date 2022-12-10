type Thumbnails = {
  medium: {
    url: string;
    width: string;
    height: string;
  };
};

export type Video = {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
  };
};

export type Channel = {
  id: string;
  snippet: {
    thumbnails: Thumbnails;
  };
};
