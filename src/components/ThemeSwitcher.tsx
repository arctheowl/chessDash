'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses } from '@/lib/themeUtils';

// Predefined gradient classes for theme indicators
const themeGradients = {
  'Purple Night': 'bg-gradient-to-r from-purple-500 to-blue-600',
  'Ocean Blue': 'bg-gradient-to-r from-blue-500 to-cyan-600',
  'Emerald Forest': 'bg-gradient-to-r from-emerald-500 to-green-600',
  'Sunset Orange': 'bg-gradient-to-r from-orange-500 to-red-600',
  'Rose Pink': 'bg-gradient-to-r from-rose-500 to-pink-600',
  'Classic Light': 'bg-gradient-to-r from-gray-600 to-gray-700',
  'Midnight Dark': 'bg-gradient-to-r from-gray-400 to-gray-500',
};

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentThemeClasses = getThemeClasses(currentTheme);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeSelect = (theme: typeof themes[0]) => {
    setTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${currentThemeClasses.surface} ${currentThemeClasses.surfaceHover}
          ${currentThemeClasses.textPrimary} ${currentThemeClasses.border}
          backdrop-blur-lg
        `}
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`
          absolute right-0 top-full mt-2 w-64 rounded-xl shadow-lg z-50
          ${currentThemeClasses.surface} ${currentThemeClasses.border}
          backdrop-blur-lg
        `}>
          <div className="p-2">
            {themes.map((theme) => {
              const themeClasses = getThemeClasses(theme);
              const gradientClass = themeGradients[theme.name as keyof typeof themeGradients] || themeGradients['Purple Night'];
              return (
                <button
                  key={theme.name}
                  onClick={() => handleThemeSelect(theme)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-left
                    transition-colors duration-200 ${themeClasses.surfaceHover}
                    ${currentTheme.name === theme.name ? 'bg-opacity-20' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${gradientClass}`} />
                    <div>
                      <div className={`font-medium ${currentTheme.name === 'Classic Light' ? 'text-gray-900' : ''}`}>
                        {theme.name}
                      </div>
                      <div className={`text-xs ${themeClasses.textMuted}`}>
                        {theme.description}
                      </div>
                    </div>
                  </div>
                  {currentTheme.name === theme.name && (
                    <Check className={`w-4 h-4 ${themeClasses.iconPrimary}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
