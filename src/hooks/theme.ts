import { useEffect, useState } from 'react';
import { isBrowser } from '../utils/common';

const themeKey = 'theme';

export default function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (isBrowser && localStorage?.[themeKey]) || 'light'
  );

  useEffect(() => {
    isBrowser && localStorage.setItem(themeKey, theme);
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [theme]);

  return [theme, setTheme] as const;
}
