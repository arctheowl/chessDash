'use client';

import { User, Trophy, MapPin, Calendar, Hash } from 'lucide-react';
import { Player, RatingHistory } from '@/types/chess';
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses, getIconColorClass, getAvatarGradientClass, getTitleBadgeClass } from '@/lib/themeUtils';

interface PlayerCardProps {
  player: Player;
  ratingHistory?: RatingHistory[];
}

export default function PlayerCard({ player, ratingHistory = [] }: PlayerCardProps) {
  const { currentTheme } = useTheme();
  const themeClasses = getThemeClasses(currentTheme);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Calculate current rating from the latest game
  const getCurrentRating = () => {
    if (ratingHistory.length === 0) {
      return player.rating || 'N/A';
    }

    // Sort by game date and get the latest game with a valid rating
    const validGames = ratingHistory
      .filter(game => Number(game.player_rating) > 0)
      .sort((a, b) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime());

    if (validGames.length === 0) {
      return player.rating || 'N/A';
    }

    return validGames[0].player_rating;
  };

  const currentRating = getCurrentRating();

  return (
    <div className={`${themeClasses.card} p-8`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Player Avatar */}
        <div className="flex-shrink-0">
          <div className={`w-24 h-24 ${getAvatarGradientClass(currentTheme)} rounded-full flex items-center justify-center`}>
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Player Information */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h2 className={`text-3xl font-bold ${themeClasses.textPrimary}`}>{player.full_name}</h2>
            {player.title && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTitleBadgeClass(currentTheme)}`}>
                <Trophy className="w-4 h-4 mr-1" />
                {player.title}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRating && currentRating !== 'N/A' && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center`}>
                  <Hash className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Current Rating</div>
                  <div className={`text-xl font-semibold ${themeClasses.textPrimary}`}>{currentRating}</div>
                </div>
              </div>
            )}

            {(player.federation || player.country || player.nation) && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center`}>
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Federation</div>
                  <div className={`text-xl font-semibold ${themeClasses.textPrimary}`}>
                    {player.federation || player.country || player.nation}
                  </div>
                </div>
              </div>
            )}

            {(player.club_name || player.club_code) && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center`}>
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Club</div>
                  <div className={`text-xl font-semibold ${themeClasses.textPrimary}`}>
                    {player.club_name || player.club_code}
                  </div>
                </div>
              </div>
            )}

            {player.dateOfBirth && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center`}>
                  <Calendar className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Date of Birth</div>
                  <div className={`text-xl font-semibold ${themeClasses.textPrimary}`}>
                    {formatDate(player.dateOfBirth)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional IDs */}
          {(player.FIDE_no || player.ECF_code) && (
            <div className={`mt-6 pt-6 border-t ${themeClasses.border}`}>
              <div className="flex flex-wrap gap-4">
                {player.FIDE_no && (
                  <div className="text-sm">
                    <span className={themeClasses.textSecondary}>FIDE ID:</span>
                    <span className={`${themeClasses.textPrimary} ml-2 font-mono`}>{player.FIDE_no}</span>
                  </div>
                )}
                {player.ECF_code && (
                  <div className="text-sm">
                    <span className={themeClasses.textSecondary}>ECF ID:</span>
                    <span className={`${themeClasses.textPrimary} ml-2 font-mono`}>{player.ECF_code}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
