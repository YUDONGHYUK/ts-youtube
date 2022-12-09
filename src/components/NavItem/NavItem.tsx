import { NavItemType } from '../Navbar/Navbar';
import Icon from '../Icon/Icon';

type NavItemProps = {
  item: NavItemType;
  onUpdate: (id: string) => void;
};

export default function NavItem({ item, onUpdate }: NavItemProps) {
  const { name, isActive } = item;

  return (
    <li
      className={`flex flex-col justify-center items-center rounded-xl py-2 lg:h-12 lg:mb-1 lg:px-3 lg:flex-row ${
        isActive ? 'bg-zinc-800' : ''
      } hover:bg-zinc-800`}
      onClick={() => onUpdate(item.id)}
    >
      <Icon name={name} />
      <span className='text-xs lg:w-full lg:text-base'>{name}</span>
    </li>
  );
}
