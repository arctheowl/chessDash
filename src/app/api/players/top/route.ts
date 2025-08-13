import { NextRequest, NextResponse } from 'next/server';
import { samplePlayers } from '@/lib/sample-data';

// ECF API base URL for top players
const ECF_API_BASE = 'https://rating.englishchess.org.uk/v2/new/list_top_players.php?domain=S&age_limit=none&age_col=age31dec&nation=ENG&gender=both&type=rating&format=json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';

  try {
    // Fetch top players by rating from ECF API
    const url = `${ECF_API_BASE}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`ECF API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to match our Player interface and limit to top 10
    const topPlayers = (data.players || data || [])
      .map((player: any) => ({
        full_name: player.name || player.full_name || 'Unknown',
        rating: player.current_rating ,
        title: player.title || '',
        federation: player.fedn,
        club_name: player.club,
        gender: player.sex || '',
        FIDE_no: player.FIDE,
        ECF_code: player.ECFcode ,
      }))
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)) // Sort by rating descending
      .slice(0, parseInt(limit)); // Take only the top N players

    
    return NextResponse.json({
      players: topPlayers,
      total: topPlayers.length,
      source: 'ecf-api'
    });
  } catch (error) {
    console.error('Error fetching top players from ECF API, using sample data:', error);
    
    // Fallback to sample data sorted by rating
    const sortedSamplePlayers = [...samplePlayers]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, parseInt(limit));
    
    return NextResponse.json({
      players: sortedSamplePlayers,
      total: sortedSamplePlayers.length,
      source: 'sample-data'
    });
  }
}
