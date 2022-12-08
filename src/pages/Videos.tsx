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
    <main className='px-8'>
      <div>Videos</div>
      {isLoading && <p>Loaindg...</p>}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
          {videos?.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </ul>
      )}
    </main>
  );
}
