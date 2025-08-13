import { NextRequest, NextResponse } from 'next/server';

// ECF API base URL
const ECF_API_BASE = 'https://rating.englishchess.org.uk/v2/new/api.php?v2/games/Standard/player/';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: playerId } = await params;

  if (!playerId) {
    return NextResponse.json(
      { error: 'Player ID is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch player rating history
    const url = `${ECF_API_BASE}${playerId}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`ECF API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data.games);
  } catch (error) {
    console.error('Error fetching player rating history from ECF API, using sample data:', error);
  }
}
