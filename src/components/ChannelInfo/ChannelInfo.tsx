import { useQuery } from '@tanstack/react-query';
import { Youtube } from '../../api/youtube';
// import { FakeYoutube } from '../api/fakeYoutube';

type ChannelInfoProps = {
  id: string;
  title: string;
};

export default function ChannelInfo({ id, title }: ChannelInfoProps) {
  const { data: channel } = useQuery(
    ['channel', id],
    async () => Youtube.channelDetail(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className='flex items-center my-4'>
      <img
        className='w-10 h-10 rounded-full'
        src={channel?.snippet.thumbnails.medium.url}
        alt={title}
      />
      <span className='text-base font-medium ml-2'>{title}</span>
    </div>
  );
}
