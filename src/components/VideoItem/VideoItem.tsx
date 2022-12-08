import { Video } from '../../api/fakeYoutube';
import { timeAgo } from '../../utils/timeAgo';

type VideoItemProps = {
  video: Video;
};

export default function VideoItem({ video }: VideoItemProps) {
  const { publishedAt, title, thumbnails, channelTitle } = video.snippet;

  return (
    <li>
      <img
        className='w-full'
        src={thumbnails.medium.url}
        alt={title}
        width={thumbnails.medium.width}
        height={thumbnails.medium.height}
      />
      <div>
        <p className='font-semibold my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{timeAgo(publishedAt)}</p>
      </div>
    </li>
  );
}
