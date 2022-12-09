import { IconName } from '../Navbar/Navbar';
import { AiFillHome } from 'react-icons/ai';
import { FaRunning, FaGamepad, FaMusic, FaNewspaper } from 'react-icons/fa';
import { MdMovie, MdPets } from 'react-icons/md';

function getIcon(name: IconName) {
  const styles = `w-6 h-6 mr-6`;

  switch (name) {
    case '홈':
      return <AiFillHome className={styles} />;
    case '스포츠':
      return <FaRunning className={styles} />;
    case '게임':
      return <FaGamepad className={styles} />;
    case '음악':
      return <FaMusic className={styles} />;
    case '영화':
      return <MdMovie className={styles} />;
    case '동물':
      return <MdPets className={styles} />;
    case '뉴스':
      return <FaNewspaper className={styles} />;
    default:
      return null;
  }
}

type IconProps = {
  name: IconName;
};

export default function Icon({ name }: IconProps) {
  return getIcon(name);
}
