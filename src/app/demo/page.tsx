'use client';

import { useState, useEffect } from 'react';
import { Search, User, TrendingUp, Calendar, Loader2, Trophy } from 'lucide-react';
import PlayerSearch from '@/components/PlayerSearch';
import PlayerCard from '@/components/PlayerCard';
import RatingChart from '@/components/RatingChart';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Player, RatingHistory } from '@/types/chess';
import { sampleRatingHistory } from '@/lib/sample-data';
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses, getGradientClass, getAvatarGradientClass } from '@/lib/themeUtils';

export default function DemoPage() {
  const { currentTheme } = useTheme();
  const themeClasses = getThemeClasses(currentTheme);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [ratingHistory, setRatingHistory] = useState<RatingHistory[]>([]);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [loadingTopPlayers, setLoadingTopPlayers] = useState(true);
  const [loadingRatingHistory, setLoadingRatingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch top players on component mount
  useEffect(() => {
    const fetchTopPlayers = async () => {
      setLoadingTopPlayers(true);
      setError(null);
      try {
        const response = await fetch('/api/players/top?limit=10');
        if (response.ok) {
          const data = await response.json();
          setTopPlayers(data.players || []);
        } else {
          throw new Error(`Failed to fetch top players: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching top players:', error);
        setError('Failed to load top players. Using sample data instead.');
      } finally {
        setLoadingTopPlayers(false);
      }
    };

    fetchTopPlayers();
  }, []);

  const fetchRatingHistory = async (playerId: string) => {
    setLoadingRatingHistory(true);
    setError(null);
    try {
      const response = await fetch(`/api/players/${playerId}/history`);
      if (response.ok) {
        const data = await response.json();
        console.log('Rating history data:', data);
        // Handle both direct array and wrapped response
        const historyData = Array.isArray(data) ? data : (data.ratings || []);
        setRatingHistory(historyData);
      } else {
        throw new Error(`Failed to fetch rating history: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching rating history:', error);
      setError('Failed to load rating history. Using sample data instead.');
      setRatingHistory(sampleRatingHistory);
    } finally {
      setLoadingRatingHistory(false);
    }
  };

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
    fetchRatingHistory(player.ECF_code);
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
              <strong>Demo Mode:</strong> This is a demonstration using real player data from the ECF API. 
              Try searching for any player or click on the top players below to see the features in action.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <PlayerSearch onPlayerSelect={handlePlayerSelect} />
        </div>

        {/* Top Players Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-4 text-center flex items-center justify-center gap-2`}>
            <Trophy className="w-5 h-5" />
            Top 10 Players by Rating
          </h3>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          {loadingTopPlayers ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              <span className={`ml-2 ${themeClasses.textSecondary}`}>Loading top players...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {topPlayers.map((player, index) => (
                <button
                  key={player.ECF_code}
                  onClick={() => handlePlayerSelect(player)}
                  className={`${themeClasses.surface} rounded-xl p-4 ${themeClasses.surfaceHover} transition-colors text-left relative`}
                >
                  {/* Rank badge */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${getAvatarGradientClass(currentTheme)} rounded-full flex items-center justify-center`}>
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`${themeClasses.textPrimary} font-medium truncate`}>
                        {player.full_name}
                      </div>
                      <div className={`${themeClasses.textSecondary} text-sm`}>
                        Rating: {player.rating} • {player.title}
                      </div>
                      {player.federation && (
                        <div className={`${themeClasses.textSecondary} text-xs`}>
                          {player.federation}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Player Information and Charts */}
        {selectedPlayer && (
          <div className="space-y-8">
            <PlayerCard player={selectedPlayer} ratingHistory={ratingHistory} />
            
            <div className={`${themeClasses.card} p-8`}>
              <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-2`}>
                <TrendingUp className={`w-6 h-6 ${themeClasses.iconPrimary}`} />
                Rating History
                {loadingRatingHistory && <Loader2 className="w-5 h-5 animate-spin" />}
              </h2>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              {loadingRatingHistory ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                  <span className={`ml-2 ${themeClasses.textSecondary}`}>Loading rating history...</span>
                </div>
              ) : (
                <RatingChart data={ratingHistory} />
              )}
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
