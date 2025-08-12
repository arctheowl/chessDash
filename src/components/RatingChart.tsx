'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { RatingHistory } from '@/types/chess';
import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses, getThemeColorHex } from '@/lib/themeUtils';

interface RatingChartProps {
  data: RatingHistory[];
}

export default function RatingChart({ data }: RatingChartProps) {
  const { currentTheme } = useTheme();
  const themeClasses = getThemeClasses(currentTheme);
  console.log('RatingChart received data:', data);
  
  // Filter out games with player rating of 0, missing opponent, or missing score
  const filteredData = data.filter(item => 
    Number(item.player_rating) > 0 && 
    item.opponent_name && item.score != "-"
  );
  const sortedData = [...filteredData].sort((a, b) => 
    new Date(a.game_date).getTime() - new Date(b.game_date).getTime()
  );

  // Format data for the chart
  const chartData = sortedData.map((item, index) => ({
    ...item,
    date: new Date(item.game_date).toLocaleDateString('en-GB', {
      month: 'short',
      year: '2-digit'
    }),
    rating: Number(item.player_rating),
    opponent: item.opponent_name,
    event: item.event_name,
    score: item.score,
    // Preserve original fields for tooltip
    originalEvent: item.event_name,
    originalOpponent: item.opponent_name,
    originalScore: item.score,
    // Add unique key for proper re-rendering
    key: `${item.game_date}-${item.opponent_name}-${index}`,
    index: index
  }));

  console.log('Chart data after processing:', chartData);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      // Convert score to readable result
      const getResultText = (score: string) => {
        const scoreNum = parseFloat(score);
        if (scoreNum === 1) return 'Win';
        if (scoreNum === 5) return 'Draw';
        if (scoreNum === 0) return 'Loss';
        return score; // Fallback to original score if unknown
      };

      // Find the correct data point using the unique key
      const uniqueKey = data.key;
      const actualData = chartData.find(item => item.key === uniqueKey);

      return (
        <div className={`bg-white/90 backdrop-blur-lg p-4 rounded-lg border border-white/20 shadow-lg`}>
          <p className="text-gray-800 font-medium">{`Date: ${label}`}</p>
          <p style={{ color: getThemeColorHex(currentTheme, 'primary') }} className="font-semibold">
            {`Rating: ${payload[0].value}`}
          </p>
          {actualData?.originalEvent && (
            <p className="text-gray-600 text-sm">
              {`Event: ${actualData.originalEvent}`}
            </p>
          )}
          {actualData?.originalOpponent && (
            <p className="text-gray-600 text-sm">
              {`Opponent: ${actualData.originalOpponent}`}
            </p>
          )}
          {actualData?.originalScore && (
            <p className="text-gray-600 text-sm">
              {`Result: ${getResultText(actualData.originalScore)}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className={`${themeClasses.textMuted} text-lg mb-2`}>No rating history available</div>
        <div className={`${themeClasses.textMuted} text-sm`}>
          This player doesn't have any recorded rating history yet.
        </div>
      </div>
    );
  }

  // Calculate rating range for Y-axis, starting from 500
  const ratings = chartData.map(d => d.rating);
  const minRating = Math.max(500, Math.min(...ratings));
  const maxRating = Math.max(...ratings);
  const ratingRange = maxRating - minRating;
  const yAxisMin = Math.max(500, minRating - ratingRange * 0.1);
  const yAxisMax = maxRating + ratingRange * 0.1;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={getThemeColorHex(currentTheme, 'primary')} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={getThemeColorHex(currentTheme, 'primary')} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[yAxisMin, yAxisMax]}
            tickFormatter={(value) => value.toFixed(0)}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: getThemeColorHex(currentTheme, 'primary'), strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="rating"
            stroke={getThemeColorHex(currentTheme, 'primary')}
            strokeWidth={3}
            fill="url(#ratingGradient)"
            dot={{ fill: getThemeColorHex(currentTheme, 'primary'), strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: getThemeColorHex(currentTheme, 'primary'), strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className={`${themeClasses.surface} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
            {chartData[chartData.length - 1]?.rating || 'N/A'}
          </div>
          <div className={`text-sm ${themeClasses.textSecondary}`}>Current Rating</div>
        </div>
        
        <div className={`${themeClasses.surface} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
            {Math.max(...ratings)}
          </div>
          <div className={`text-sm ${themeClasses.textSecondary}`}>Highest Rating</div>
        </div>
        
        <div className={`${themeClasses.surface} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
            {Math.min(...ratings)}
          </div>
          <div className={`text-sm ${themeClasses.textSecondary}`}>Lowest Rating</div>
        </div>
        
        <div className={`${themeClasses.surface} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
            {chartData.length}
          </div>
          <div className={`text-sm ${themeClasses.textSecondary}`}>Games Recorded</div>
        </div>
      </div>
    </div>
  );
}
