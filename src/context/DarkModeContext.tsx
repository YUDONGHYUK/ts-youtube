import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

type DarkModeContextProviderProps = {
  children: ReactNode;
};

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}

export const DarkModeContext = createContext({} as DarkModeContextType);

export function DarkModeContextProvider({
  children,
}: DarkModeContextProviderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    console.log('darkMode', darkMode);
    setDarkMode((prev) => !prev);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
