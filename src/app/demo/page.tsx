'use client';

import { useState } from 'react';
import { Search, User, TrendingUp, Calendar } from 'lucide-react';
import PlayerSearch from '@/components/PlayerSearch';
import PlayerCard from '@/components/PlayerCard';
import RatingChart from '@/components/RatingChart';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Player, RatingHistory } from '@/types/chess';
import { samplePlayers, sampleRatingHistory } from '@/lib/sample-data';
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses, getGradientClass, getAvatarGradientClass } from '@/lib/themeUtils';

export default function DemoPage() {
  const { currentTheme } = useTheme();
  const themeClasses = getThemeClasses(currentTheme);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [ratingHistory, setRatingHistory] = useState<RatingHistory[]>([]);

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
    // Use sample rating history for demo
    setRatingHistory(sampleRatingHistory);
  };

  return (
    <div className={`min-h-screen ${getGradientClass(currentTheme)}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <ThemeSwitcher />
          </div>
          <h1 className={`text-5xl font-bold ${themeClasses.textPrimary} mb-4`}>
            Chess Rating Dashboard - Demo
          </h1>
          <p className={`text-xl ${themeClasses.textSecondary} mb-4`}>
            Track player ratings and performance over time
          </p>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-300 text-sm">
              <strong>Demo Mode:</strong> This is a demonstration using sample data. 
              Try searching for "Magnus", "Hikaru", or "Judit" to see the features in action.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <PlayerSearch onPlayerSelect={handlePlayerSelect} />
        </div>

        {/* Sample Players Quick Access */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-4 text-center`}>
            Quick Demo - Try these players:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {samplePlayers.map((player) => (
              <button
                key={player.ECF_code}
                onClick={() => handlePlayerSelect(player)}
                className={`${themeClasses.surface} rounded-xl p-4 ${themeClasses.surfaceHover} transition-colors text-left`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${getAvatarGradientClass(currentTheme)} rounded-full flex items-center justify-center`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className={`${themeClasses.textPrimary} font-medium`}>{player.full_name}</div>
                    <div className={`${themeClasses.textSecondary} text-sm`}>
                      Rating: {player.rating} • {player.title}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Player Information and Charts */}
        {selectedPlayer && (
          <div className="space-y-8">
            <PlayerCard player={selectedPlayer} ratingHistory={ratingHistory} />
            
            <div className={`${themeClasses.card} p-8`}>
              <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-2`}>
                <TrendingUp className={`w-6 h-6 ${themeClasses.iconPrimary}`} />
                Rating History (Sample Data)
              </h2>
              <RatingChart data={ratingHistory} />
            </div>
          </div>
        )}

        {/* Features Section */}
        {!selectedPlayer && (
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className={`${themeClasses.card} p-6 text-center`}>
              <Search className={`w-12 h-12 ${themeClasses.iconPrimary} mx-auto mb-4`} />
              <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-2`}>
                Search Players
              </h3>
              <p className={themeClasses.textSecondary}>
                Find any player by name using the ECF database
              </p>
            </div>
            
            <div className={`${themeClasses.card} p-6 text-center`}>
              <User className={`w-12 h-12 ${themeClasses.iconPrimary} mx-auto mb-4`} />
              <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-2`}>
                Player Profiles
              </h3>
              <p className={themeClasses.textSecondary}>
                View detailed player information and statistics
              </p>
            </div>
            
            <div className={`${themeClasses.card} p-6 text-center`}>
              <Calendar className={`w-12 h-12 ${themeClasses.iconPrimary} mx-auto mb-4`} />
              <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-2`}>
                Rating Tracking
              </h3>
              <p className={themeClasses.textSecondary}>
                Monitor rating changes and performance trends
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
