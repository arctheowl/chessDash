import { Player, RatingHistory } from '@/types/chess';

export const samplePlayers: Player[] = [
  {
    full_name: 'Magnus Carlsen',
    rating: 2830,
    title: 'GM',
    federation: 'NOR',
    club_name: 'Vålerenga Sjakklubb',
    dateOfBirth: '1990-11-30',
    gender: 'M',
    FIDE_no: '1503014',
    ECF_code: '12345',
    member_no: '12345',
    category: 'GM',
    country: 'Norway',
    nation: 'Norway',
    nation2: 'Norway',
    flag: '🇳🇴',
    date_last_game: '2024-01-15'
  },
  {
    full_name: 'Hikaru Nakamura',
    rating: 2780,
    title: 'GM',
    federation: 'USA',
    club_name: 'Chess.com',
    dateOfBirth: '1987-12-09',
    gender: 'M',
    FIDE_no: '2016192',
    ECF_code: '67890',
    member_no: '67890',
    category: 'GM',
    country: 'USA',
    nation: 'USA',
    nation2: 'USA',
    flag: '🇺🇸',
    date_last_game: '2024-01-15'
  },
  {
    full_name: 'Judit Polgár',
    rating: 2675,
    title: 'GM',
    federation: 'HUN',
    club_name: 'Retired',
    dateOfBirth: '1976-07-23',
    gender: 'F',
    FIDE_no: '700070',
    ECF_code: '11111',
    member_no: '11111',
    category: 'GM',
    country: 'Hungary',
    nation: 'Hungary',
    nation2: 'Hungary',
    flag: '🇭🇺',
    date_last_game: '2024-01-15'
  }
];

export const sampleRatingHistory: RatingHistory[] = [
  {
    club_code: 'VSK',
    colour: 'white',
    event_code: 'TATA2024',
    event_name: 'Tata Steel Chess 2024',
    game_date: new Date('2024-01-15'),
    increment: 0,
    opponent_name: 'Alireza Firouzja',
    opponent_no: 'FID123',
    opponent_rating: '2750',
    org_name: 'Tata Steel',
    player_rating: '2830',
    score: '1-0',
    section_title: 'Masters'
  },
  {
    club_code: 'VSK',
    colour: 'black',
    event_code: 'NORWAY2024',
    event_name: 'Norway Chess 2024',
    game_date: new Date('2024-02-20'),
    increment: 0,
    opponent_name: 'Fabiano Caruana',
    opponent_no: 'FID456',
    opponent_rating: '2800',
    org_name: 'Norway Chess',
    player_rating: '2825',
    score: '0.5-0.5',
    section_title: 'Masters'
  },
  {
    club_code: 'VSK',
    colour: 'white',
    event_code: 'CANDIDATES2024',
    event_name: 'Candidates Tournament 2024',
    game_date: new Date('2024-03-10'),
    increment: 0,
    opponent_name: 'Nepomniachtchi',
    opponent_no: 'FID789',
    opponent_rating: '2790',
    org_name: 'FIDE',
    player_rating: '2835',
    score: '1-0',
    section_title: 'Candidates'
  },
  {
    club_code: 'VSK',
    colour: 'black',
    event_code: 'GRANDPRIX2024',
    event_name: 'Grand Prix 2024',
    game_date: new Date('2024-04-05'),
    increment: 0,
    opponent_name: 'Ding Liren',
    opponent_no: 'FID012',
    opponent_rating: '2780',
    org_name: 'FIDE',
    player_rating: '2840',
    score: '0.5-0.5',
    section_title: 'Grand Prix'
  },
  {
    club_code: 'VSK',
    colour: 'white',
    event_code: 'WC2024',
    event_name: 'World Championship 2024',
    game_date: new Date('2024-05-12'),
    increment: 0,
    opponent_name: 'Nepomniachtchi',
    opponent_no: 'FID789',
    opponent_rating: '2790',
    org_name: 'FIDE',
    player_rating: '2830',
    score: '1-0',
    section_title: 'World Championship'
  }
];

export const searchPlayers = (query: string): Player[] => {
  const lowercaseQuery = query.toLowerCase();
  return samplePlayers.filter(player =>
    player.full_name.toLowerCase().includes(lowercaseQuery)
  );
};

export const getPlayerById = (id: string): Player | undefined => {
  return samplePlayers.find(player => player.ECF_code === id);
};

export const getPlayerRatingHistory = (playerId: string): RatingHistory[] => {
  // Return sample data for any player ID
  return sampleRatingHistory;
};
