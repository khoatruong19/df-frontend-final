import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ThemeSwitch = ({ className = '' }: { className?: string }) => {
  const [theme, setTheme] = useState('light');

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      return;
    }
    document.documentElement.setAttribute('data-theme', 'dark');
  }, [theme]);

  useEffect(() => {
    if (typeof window === undefined) return;

    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) return;

    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    setTheme(savedTheme);
  }, []);

  return (
    <button
      onClick={handleToggleTheme}
      className={cn(
        'p-1 rounded-full w-fit hover:bg-black/10 duration-75',
        className
      )}
    >
      <span>
        {theme === 'light' ? (
          <Moon fill="#363062" color="#fff" />
        ) : (
          <Sun fill="#FFA33C" color="#fff" />
        )}
      </span>
    </button>
  );
};

export default ThemeSwitch;
