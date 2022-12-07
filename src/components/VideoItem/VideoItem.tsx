import { Video } from '../../api/fakeYoutube';

type VideoItemProps = {
  video: Video;
};

export default function VideoItem({ video: { snippet } }: VideoItemProps) {
  return <p>{snippet.title}</p>;
}
