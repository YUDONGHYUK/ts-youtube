import { useNavigate } from 'react-router-dom';
import { Video } from '../../api/fakeYoutube';
import { timeAgo } from '../../utils/timeAgo';

type VideoItemProps = {
  video: Video;
  type?: 'list';
};

export default function VideoItem({ video, type }: VideoItemProps) {
  const navigate = useNavigate();
  const { publishedAt, title, thumbnails, channelTitle } = video.snippet;

  return (
    <li
      className={`${
        type === 'list' ? 'flex gap-2 mb-2' : ''
      } hover:scale-105 transition-transform`}
      onClick={() => navigate(`/videos/watch/${video.id}`, { state: video })}
    >
      <img
        className={`${type === 'list' ? 'w-40' : 'w-full'} rounded-lg`}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p
          className={`${
            type === 'list' ? 'text-sm' : ''
          } font-semibold my-2 line-clamp-2`}
        >
          {title}
        </p>
        <p className={`${type === 'list' ? 'text-xs' : 'text-sm'} opacity-80`}>
          {channelTitle}
        </p>
        <p className={`${type === 'list' ? 'text-xs' : 'text-sm'} opacity-80`}>
          {timeAgo(publishedAt)}
        </p>
      </div>
    </li>
  );
}
