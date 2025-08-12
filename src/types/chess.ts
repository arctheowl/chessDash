export interface Player {
  full_name: string;
  rating?: number;
  title?: string;
  federation?: string;
  club_name?: string;
  club_code?: string;
  dateOfBirth?: string;
  gender?: string;
  FIDE_no?: string;
  ECF_code: string;
  member_no?: string;
  category?: string;
  country?: string;
  nation?: string;
  nation2?: string;
  flag?: string;
  date_last_game?: string;
}

export interface RatingHistory {
  club_code: string
  colour: string
  event_code: string
  event_name: string;
  game_date: Date;
  increment: number;
  opponent_name: string;
  opponent_no: string
  opponent_rating: string
  org_name: string
  player_rating: string
  score: string
  section_title: string
}

export interface PlayerSearchResult {
  players: Player[];
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}
