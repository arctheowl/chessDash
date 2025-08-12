'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, themes, defaultTheme } from './themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedThemeName = localStorage.getItem('chess-dashboard-theme');
    if (savedThemeName) {
      const savedTheme = themes.find(theme => theme.name === savedThemeName);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('chess-dashboard-theme', theme.name);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
