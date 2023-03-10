import { useState, useEffect } from 'react';
import './Theme.css';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
      <button type="button" className="btn btn-themeSwitcher" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};