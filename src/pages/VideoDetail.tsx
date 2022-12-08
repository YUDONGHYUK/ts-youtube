import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos/RelatedVideos';
import { FakeYoutube } from '../api/fakeYoutube';
import { Youtube } from '../api/youtube';

export default function VideoDetail() {
  const { state: video } = useLocation();
  const { title, channelTitle, description } = video.snippet;

  const { data: channel } = useQuery(
    ['channel', video.id],
    async () => FakeYoutube.channelDetail(),
    { staleTime: 1000 * 60 * 5 }
  );

  console.log();

  return (
    <section className='flex flex-col lg:flex-row'>
      <div className='basis-9/12 pr-6'>
        <iframe
          id='player'
          title={title}
          width='100%'
          height='600'
          src={`http://www.youtube.com/embed/${video.id}`}
          frameBorder='0'
        ></iframe>
        <div className='mt-2'>
          <h3 className='text-xl font-bold'>{title}</h3>
          <div className='flex items-center my-4'>
            <img
              className='w-10 h-10 rounded-full'
              src={channel?.snippet.thumbnails.medium.url}
              alt={channelTitle}
            />
            <span className='text-base font-medium ml-2'>{channelTitle}</span>
          </div>
          <pre className='whitespace-pre-wrap p-2 rounded-xl bg-zinc-800 text-sm'>
            {description}
          </pre>
        </div>
      </div>
      <section className='basis-3/12'>
        <RelatedVideos id={video.id} />
      </section>
    </section>
  );
}
