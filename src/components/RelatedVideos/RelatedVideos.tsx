import { useQuery } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';
import { useYoutubeApi } from '../context/YoutubeContext';
import VideoItem from '../VideoItem/VideoItem';

type RelatedVideosProps = {
  id: string;
};

export default function RelatedVideos({ id }: RelatedVideosProps) {
  const youtube = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['related', id], async () => youtube.relatedVideos(id), {
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center w-full'>
          <Oval
            height={50}
            width={50}
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
