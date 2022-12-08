import { useQuery } from '@tanstack/react-query';
import { FakeYoutube } from '../../api/fakeYoutube';
import { Youtube } from '../../api/youtube';
import VideoItem from '../VideoItem/VideoItem';

type RelatedVideosProps = {
  id: string;
};

export default function RelatedVideos({ id }: RelatedVideosProps) {
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['related', id], async () => FakeYoutube.relatedVideos(), {
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul>
          {videos?.map((video: any) => (
            <VideoItem key={video.id} video={video} type='list' />
          ))}
        </ul>
      )}
    </>
  );
}
