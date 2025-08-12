import { NextRequest, NextResponse } from 'next/server';
import { searchPlayers } from '@/lib/sample-data';

// ECF API base URL
const ECF_API_BASE = 'https://rating.englishchess.org.uk/v2/new/api.php?v2/players/';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const playerId = searchParams.get('id');

  if (!query && !playerId) {
    return NextResponse.json(
      { error: 'Query parameter "q" or "id" is required' },
      { status: 400 }
    );
  }

  try {
    let url: string;
    
    if (playerId) {
      // Get specific player by ID
      url = `${ECF_API_BASE}?db=players&id=${playerId}`;
    } else {
      // Search for players by name
      url = `${ECF_API_BASE}name/${encodeURIComponent(query!)}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`ECF API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching player data from ECF API, using sample data:', error);
    
    // Fallback to sample data
    if (query) {
      const sampleResults = searchPlayers(query);
      return NextResponse.json({
        players: sampleResults,
        total: sampleResults.length,
        source: 'sample-data'
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch player data' },
      { status: 500 }
    );
  }
}
