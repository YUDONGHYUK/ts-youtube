import { useLocation } from 'react-router-dom';
import RelatedVideos from '../components/RelatedVideos/RelatedVideos';
import ChannelInfo from '../components/ChannelInfo/ChannelInfo';
import { Video } from '../types';

export default function VideoDetail() {
  const location = useLocation();
  const video = location.state as Video;
  const { title, channelTitle, description, channelId } = video.snippet;

  return (
    <section className='flex flex-col lg:flex-row'>
      <div className='basis-9/12 pr-6'>
        <iframe
          id='player'
          title={title}
          width='100%'
          height='600'
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder='0'
        ></iframe>
        <div className='mt-2'>
          <h3 className='text-xl font-bold'>{title}</h3>
          <ChannelInfo id={channelId} title={channelTitle} />
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
