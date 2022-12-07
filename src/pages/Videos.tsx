import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FakeYoutube, Video } from '../api/fakeYoutube';
// import { Youtube } from '../api/youtube';

import VideoItem from '../components/VideoItem/VideoItem';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<Video[], Error, Video[]>(['videos', keyword], async () =>
    FakeYoutube.search(keyword)
  );

  return (
    <>
      <div>Videos</div>
      {isLoading && <p>Loaindg...</p>}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <ul>
          {videos?.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
