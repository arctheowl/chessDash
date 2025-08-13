'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RatingHistory } from '@/types/chess';
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses, getThemeColorHex } from '@/lib/themeUtils';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RatingChartProps {
  data: RatingHistory[];
}

export default function RatingChart({ data }: RatingChartProps) {
  const { currentTheme } = useTheme();
  const themeClasses = getThemeClasses(currentTheme);

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
   
    // Add unique key for proper re-rendering
    key: `${item.game_date}-${item.opponent_name}-${index}`,
    index: index
  }));


  if (chartData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className={`${themeClasses.textMuted} text-lg mb-2`}>No rating history available</div>
        <div className={`${themeClasses.textMuted} text-sm`}>
          This player doesn`t have any recorded rating history yet.
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

  // Convert score to readable result
  const getResultText = (score: string) => {

    const scoreNum = parseInt(score);

    
    switch (scoreNum) {
      case 1:
        return 'Win';
      case 5:
        return 'Draw';
      default:
        return 'Loss';
    }
  };

  const chartConfig = {
    data: {
      labels: chartData.map(d => d.date),
      datasets: [
        {
          label: 'Rating',
          data: chartData.map(d => d.rating),
          borderColor: getThemeColorHex(currentTheme, 'primary'),
          backgroundColor: getThemeColorHex(currentTheme, 'primary') + '20',
          borderWidth: 3,
          pointBackgroundColor: getThemeColorHex(currentTheme, 'primary'),
          pointBorderColor: getThemeColorHex(currentTheme, 'primary'),
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 2,
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index' as const,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#1f2937',
          bodyColor: '#374151',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: (context: any) => {
              return `Date: ${context[0].label}
Rating: ${context[0].parsed.y}`;
            },
            label: (context: any) => {
              const dataIndex = context.dataIndex;
              const dataPoint = chartData[dataIndex];

              
              let label = ``;
              
              if (dataPoint?.event_name) {
                label += `\nEvent: ${dataPoint.event_name}`;
              }
              if (dataPoint?.opponent_name) {
                label += `\nOpponent: ${dataPoint.opponent_name}`;
              }
              if (dataPoint?.opponent_rating) {
                label += `\nOpponent Rating: ${dataPoint.opponent_rating}`;
              }
              if (true) {
                label += `\nResult: ${getResultText(dataPoint.score)}`;
              }
              
              return label.split('\n');
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            drawBorder: false,
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 12,
            },
          },
          border: {
            display: false,
          },
        },
        y: {
          min: yAxisMin,
          max: yAxisMax,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            drawBorder: false,
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 12,
            },
            callback: (value: any) => value.toFixed(0),
          },
          border: {
            display: false,
          },
        },
      },
      elements: {
        point: {
          hoverBackgroundColor: getThemeColorHex(currentTheme, 'primary'),
          hoverBorderColor: getThemeColorHex(currentTheme, 'primary'),
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div style={{ height: '400px' }}>
        <Line data={chartConfig.data} options={chartConfig.options} />
      </div>

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
