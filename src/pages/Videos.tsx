import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';
import { useYoutubeApi } from '../components/context/YoutubeContext';
import VideoItem from '../components/VideoItem/VideoItem';
import { Video } from '../types';
// import { Youtube } from '../api/youtube';
// import { FakeYoutube, Video } from '../api/fakeYoutube';

export default function Videos() {
  const location = useLocation();
  const categoryId = (location?.state?.categoryId || null) as string | null;
  const { keyword } = useParams();
  const youtube = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<Video[], Error, Video[]>(
    ['videos', keyword, categoryId],
    async () => youtube.search(keyword, categoryId),
    { staleTime: 1000 * 60 * 1 }
  );

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center w-full'>
          <Oval
            height={80}
            width={80}
            color='#71717a'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#52525b'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      {error && <p>Something is wrong...</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-4'>
          {videos?.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
