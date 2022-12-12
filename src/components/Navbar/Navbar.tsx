import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';

export type IconName =
  | '홈'
  | '스포츠'
  | '게임'
  | '음악'
  | '예능'
  | '동물'
  | '뉴스';

export type NavItemType = {
  id: string;
  name: IconName;
  categoryId: number | null;
  isActive: boolean;
};

const NAV_MENU: NavItemType[] = [
  { id: '1', name: '홈', categoryId: null, isActive: true },
  { id: '2', name: '스포츠', categoryId: 17, isActive: false },
  { id: '3', name: '게임', categoryId: 20, isActive: false },
  { id: '4', name: '음악', categoryId: 10, isActive: false },
  { id: '5', name: '예능', categoryId: 24, isActive: false },
  { id: '6', name: '동물', categoryId: 15, isActive: false },
  { id: '7', name: '뉴스', categoryId: 25, isActive: false },
];

export default function Navbar() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [navList, setNavList] = useState(NAV_MENU);

  const handleUpdate = (activeId: string) => {
    setNavList((prev) =>
      prev.map((item) =>
        item.id === activeId
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );

    const activeCategory = navList.find((item) => item.id === activeId);
    navigate('/', { state: activeCategory });
  };

  const paramsKey = Object.values(params)[0];

  useEffect(() => {
    // 검색 및 VideoDetail 이동시 navItem 비활성화
    if (paramsKey) {
      setNavList((prev) => prev.map((item) => ({ ...item, isActive: false })));
    }

    if (!location.state && !paramsKey) {
      setNavList((prev) =>
        prev.map((item) => {
          return item.id === '1'
            ? { ...item, isActive: true }
            : { ...item, isActive: false };
        })
      );
    }
  }, [paramsKey, location.state]);

  return (
    <nav>
      <ul className='hidden md:block w-20 lg:w-60 mr-4 p-3 pt-0'>
        {navList.map((item: NavItemType) => (
          <NavItem key={item.id} item={item} onUpdate={handleUpdate} />
        ))}
      </ul>
    </nav>
  );
}
