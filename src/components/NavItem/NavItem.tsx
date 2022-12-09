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
      className={`flex items-center h-12 mb-1 px-3 rounded-xl ${
        isActive ? 'bg-zinc-800' : ''
      } hover:bg-zinc-800`}
      onClick={() => onUpdate(item.id)}
    >
      <Icon name={name} />
      <span>{name}</span>
    </li>
  );
}
