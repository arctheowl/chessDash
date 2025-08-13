'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Player } from '@/types/chess';
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses } from '@/lib/themeUtils';

interface PlayerSearchProps {
  onPlayerSelect: (player: Player) => void;
}

export default function PlayerSearch({ onPlayerSelect }: PlayerSearchProps) {
  const { currentTheme } = useTheme();
  const themeClasses = getThemeClasses(currentTheme);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchPlayers = async () => {
      if (query.length < 2 || isSelecting) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/players?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.players || []);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error('Error searching players:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPlayers, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, isSelecting]);

  const handlePlayerClick = (player: Player) => {
    setIsSelecting(true);
    onPlayerSelect(player);
    setQuery(player.full_name);
    setShowDropdown(false);
    setResults([]);
    
    // Reset the selecting flag after a short delay
    setTimeout(() => {
      setIsSelecting(false);
    }, 100);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-5 h-5`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a chess player..."
          className={`w-full pl-12 pr-4 py-4 ${themeClasses.surface} ${themeClasses.border} rounded-xl ${themeClasses.textPrimary} placeholder-${currentTheme.colors.text.muted} focus:outline-none focus:ring-2 focus:ring-${currentTheme.colors.primary} focus:border-transparent`}
        />
        {loading && (
          <Loader2 className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-5 h-5 animate-spin`} />
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && results.length > 0 && !isSelecting && (
        <div className={`absolute top-full left-0 right-0 mt-2 ${themeClasses.surface} ${themeClasses.border} rounded-xl overflow-hidden z-50 max-h-80 overflow-y-auto backdrop-blur-lg`}>
          {results.map((player) => (
            <button
              key={player.ECF_code}
              onClick={() => handlePlayerClick(player)}
              className={`w-full px-4 py-3 text-left ${themeClasses.surfaceHover} transition-colors border-b ${themeClasses.border} last:border-b-0`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className={`${themeClasses.textPrimary} font-medium`}>{player.full_name}</div>
                  {player.club_name && (
                    <div className={`text-sm ${themeClasses.textSecondary}`}>
                      Club: {player.club_name}
                    </div>
                  )}
                </div>
                {player.title && (
                  <span className={`${themeClasses.iconPrimary} text-sm font-medium`}>
                    {player.title}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {showDropdown && results.length === 0 && query.length >= 2 && !loading && (
        <div className={`absolute top-full left-0 right-0 mt-2 ${themeClasses.surface} ${themeClasses.border} rounded-xl p-4 text-center ${themeClasses.textSecondary}`}>
          No players found
        </div>
      )}
    </div>
  );
}
